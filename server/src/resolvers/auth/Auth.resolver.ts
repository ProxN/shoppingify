import { Arg, Args, Mutation, Resolver } from 'type-graphql';
import { MoreThan } from 'typeorm';
import crypto from 'crypto';
import User from '../../entities/User';
import validate, { isEmail } from '../../utils/validate';
import sendEmail from '../../utils/sendEmail';
import { LoginRegisterInputs, AuthResponse, ForgotPassRes, ResetPasswordInputs } from './inputs';
import * as authErrors from './errors';

@Resolver()
class AuthResolver {
  @Mutation(() => AuthResponse)
  async register(@Args() { email, password }: LoginRegisterInputs): Promise<AuthResponse> {
    const error = validate(email, password);
    if (error) {
      return { error };
    }

    let user;
    try {
      user = await User.create({ email, password }).save();
    } catch (err) {
      if (err.code === '23505') {
        return { error: authErrors.EmailAlready };
      }
    }
    return { user };
  }

  @Mutation(() => AuthResponse)
  async login(@Args() { email, password }: LoginRegisterInputs): Promise<AuthResponse> {
    const error = validate(email, password);
    if (error) {
      return { error };
    }

    const user = await User.findOne({ where: { email } });

    if (!user || !(await user.comparePassword(password, user.password))) {
      return { error: authErrors.IncorrectEmailOrPassword };
    }

    return { user };
  }

  @Mutation(() => ForgotPassRes)
  async forgotPassword(@Arg('email') email: string): Promise<ForgotPassRes> {
    if (!isEmail(email)) {
      return { error: authErrors.ValidEmail };
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return { error: authErrors.EmailNotExists };
    }

    const resetToken = user.createResetToken();

    const resetURL = `http://localhost:3000/resetPassword/${resetToken}`;

    await sendEmail({
      subject: 'Reset your password!!',
      to: user.email,
      message: `Reset your password using this link:${resetURL}`,
    });

    await user.save();

    return { emailSent: true };
  }

  @Mutation(() => AuthResponse)
  async resetPassword(@Args() { token, password }: ResetPasswordInputs): Promise<AuthResponse> {
    if (!password) {
      return { error: authErrors.EmptyPassword };
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      where: { passwordResetToekn: hashedToken, passwordResetExpires: MoreThan(new Date()) },
    });

    if (!user) {
      return { error: authErrors.InvalidToken };
    }

    user.password = password;
    user.passwordResetExpires = null;
    user.passwordResetToekn = null;
    await user.save();

    return { user };
  }
}

export default AuthResolver;