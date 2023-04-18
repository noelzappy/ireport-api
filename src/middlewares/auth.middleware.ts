import { NextFunction, Response } from 'express';
import { SECRET_KEY } from '@config';
import { DB } from '@database';
import { HttpException } from '@exceptions/httpException';
import { DataStoredInToken, RequestWithUser, TokenTypes } from '@interfaces/auth.interface';
import { verify } from 'jsonwebtoken';
import httpStatus from 'http-status';
import moment from 'moment';

const getAuthorization = req => {
  const header = req.header('Authorization');
  if (header) return header.split('Bearer ')[1];
  return null;
};

const AUTH_ERR_MSG = 'Wrong authentication token';

export const AuthMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = getAuthorization(req);

    if (Authorization) {
      const verifiedToken = verify(Authorization, SECRET_KEY) as unknown as DataStoredInToken;

      const { sub, exp, type } = verifiedToken;

      if (moment().unix() > exp) {
        next(new HttpException(httpStatus.UNAUTHORIZED, AUTH_ERR_MSG));
        return;
      }

      if (type !== TokenTypes.ACCESS) {
        next(new HttpException(httpStatus.UNAUTHORIZED, AUTH_ERR_MSG));
        return;
      }

      const findUser = await DB.Users.findByPk(sub);

      if (findUser) {
        req.user = findUser;
        next();
      } else {
        next(new HttpException(httpStatus.UNAUTHORIZED, AUTH_ERR_MSG));
      }
    } else {
      next(new HttpException(httpStatus.UNAUTHORIZED, AUTH_ERR_MSG));
    }
  } catch (error) {
    next(new HttpException(httpStatus.UNAUTHORIZED, AUTH_ERR_MSG));
  }
};
