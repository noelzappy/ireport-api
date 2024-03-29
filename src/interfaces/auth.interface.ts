import { Request } from 'express';
import { User } from '@interfaces/users.interface';

export interface DataStoredInToken {
  sub: number;
  iat: number;
  exp: number;
  type: TokenTypes;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: User;
}

export enum TokenTypes {
  ACCESS = 'access',
  REFRESH = 'refresh',
  RESET_PASSWORD = 'reset_password',
  VERIFY_EMAIL = 'verify_email',
}

export interface TokenPayload {
  token: string;
  id: number;
  type: TokenTypes;
  userId: number;
}

export interface TokenObj {
  accessToken: TokenData;
  refreshToken: TokenData;
  tokenDoc: TokenPayload;
}
