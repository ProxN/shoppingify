import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { AuthChecker } from 'type-graphql';
import User from '../entities/User';
import { Context } from '../types/context';
import { JWT_SECRET } from '../constants';

interface IDecodeToken {
  id: string;
  iat: number;
  exp: number;
}

const authChecker: AuthChecker<Context> = async ({ context }) => {
  const { req } = context;

  const token = req.cookies ? req.cookies.token : undefined;

  if (!token) {
    return false;
  }

  const decodeToken = (await promisify(jwt.verify)(token, JWT_SECRET as string)) as IDecodeToken;

  const user = await User.findOne(decodeToken.id);

  if (!user) return false;

  if (user.passwordChangedAfter(decodeToken.iat)) return false;

  req.user = user;
  return true;
};

export default authChecker;
