import { ArgsType, Field, ObjectType } from 'type-graphql';
import User from '../../entities/User';

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
  token!: string;

  @Field()
  password!: string;
}

@ObjectType()
class FieldError {
  @Field()
  field?: string;

  @Field()
  message?: string;
}

@ObjectType()
class ErrorResponse {
  @Field(() => FieldError, { nullable: true })
  error?: FieldError;
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
