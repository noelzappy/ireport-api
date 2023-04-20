import { Router } from 'express';
import { AuthController } from '@controllers/auth.controller';
import { CreateUserDto, ForgotPasswordDto, LoginUserDto, LogoutUserDto, ResetPasswordDto, VerifyEmailDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class AuthRoute implements Routes {
  public router = Router();
  public auth = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/auth/signup', ValidationMiddleware(CreateUserDto, 'body'), this.auth.signUp);
    this.router.post('/auth/login', ValidationMiddleware(LoginUserDto, 'body'), this.auth.logIn);
    this.router.post('/auth//logout', AuthMiddleware(), this.auth.logOut);
    this.router.post('/auth/refresh', AuthMiddleware(), ValidationMiddleware(LogoutUserDto), this.auth.refreshAuth);
    this.router.post('/auth/reset-password', ValidationMiddleware(ResetPasswordDto), this.auth.resetPassword);
    this.router.post('/auth/verify-email', ValidationMiddleware(VerifyEmailDto), this.auth.verifyEmail);
    this.router.post('/auth/forgot-password', ValidationMiddleware(ForgotPasswordDto), this.auth.forgotPassword);
    this.router.post('/auth/send-email-verification', ValidationMiddleware(ForgotPasswordDto), this.auth.sendEmailVerification);
  }
}
