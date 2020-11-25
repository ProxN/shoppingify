import { ArgsType, Field, ObjectType } from 'type-graphql';
import User from '../../entities/User';
import { ErrorResponse } from '../types';

@ArgsType()
export class LoginRegisterInputs {
  @Field()
  email!: string;

  @Field()
  password!: string;
}

@ArgsType()
export class ResetPasswordInputs {
  @Field()
  resetToken!: string;

  @Field()
  password!: string;
}

@ObjectType()
export class AuthResponse extends ErrorResponse {
  @Field(() => User, { nullable: true })
  user?: User;
}

@ObjectType()
export class ForgotPassRes extends ErrorResponse {
  @Field(() => Boolean, { nullable: true })
  emailSent?: boolean;
}
