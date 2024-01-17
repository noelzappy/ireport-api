import { Request, Response } from 'express';
import { Container } from 'typedi';
import { CreateUserDto, ForgotPasswordDto, LogoutUserDto, ResetPasswordDto, VerifyEmailDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import { RequestWithUser } from '@interfaces/auth.interface';
import { AuthService } from '@services/auth.service';
import catchAsync from '@/utils/catchAsync';
import httpStatus from 'http-status';

export class AuthController {
  public auth = Container.get(AuthService);

  public signUp = catchAsync(async (req: Request, res: Response) => {
    const userData: CreateUserDto = req.body;
    const { user, tokenData } = await this.auth.signup(userData);

    // TODO: Send email to user with token to verify email address
    // Do not send token in response but wait for user to verify email address

    res.status(httpStatus.CREATED).send({
      user,
      access: tokenData.accessToken,
      refresh: tokenData.refreshToken,
    });
  });

  public logIn = catchAsync(async (req: Request, res: Response) => {
    const userData: CreateUserDto = req.body;
    const { user, tokenData } = await this.auth.login(userData);

    res.status(httpStatus.OK).send({
      user,
      refresh: tokenData.refreshToken,
      access: tokenData.accessToken,
    });
  });

  public logOut = catchAsync(async (req: RequestWithUser, res: Response) => {
    const userData: User = req.user;
    const body: LogoutUserDto = req.body;
    await this.auth.logout(userData, body.refreshToken);
    res.sendStatus(httpStatus.NO_CONTENT);
  });

  public refreshAuth = catchAsync(async (req: Request, res: Response) => {
    const body: LogoutUserDto = req.body;
    const tokenData = await this.auth.refreshAuth(body.refreshToken);
    res.status(httpStatus.OK).send({
      access: tokenData.accessToken,
      refresh: tokenData.refreshToken,
    });
  });

  public resetPassword = catchAsync(async (req: Request, res: Response) => {
    const body: ResetPasswordDto = req.body;
    await this.auth.resetPassword(body.token, body.password);
    res.sendStatus(httpStatus.NO_CONTENT);
  });

  public verifyEmail = catchAsync(async (req: Request, res: Response) => {
    const body: VerifyEmailDto = req.body;
    await this.auth.verifyEmail(body.token);
    res.sendStatus(httpStatus.NO_CONTENT);
  });

  public forgotPassword = catchAsync(async (req: Request, res: Response) => {
    const body: ForgotPasswordDto = req.body;
    await this.auth.forgotPassword(body.email);
    res.sendStatus(httpStatus.NO_CONTENT);
  });

  public sendEmailVerification = catchAsync(async (req: RequestWithUser, res: Response) => {
    const body: ForgotPasswordDto = req.body;
    await this.auth.resendVerificationEmail(body.email);
    res.sendStatus(httpStatus.NO_CONTENT);
  });
}
