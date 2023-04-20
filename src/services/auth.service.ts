import { compare, hash } from 'bcrypt';
import { Service, Container } from 'typedi';
import { DB } from '@database';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@/exceptions/httpException';
import { User } from '@interfaces/users.interface';
import { TokenService } from './token.service';
import EmailService from './email.service';
import { TokenObj, TokenTypes } from '@/interfaces/auth.interface';
import httpStatus from 'http-status';
import { CLIENT_URL } from '@/config';

@Service()
export class AuthService {
  public Token = Container.get(TokenService);
  public Email = Container.get(EmailService);

  public async signup(userData: CreateUserDto): Promise<{
    tokenData: TokenObj;
    user: User;
  }> {
    const findUser: User = await DB.Users.findOne({ where: { email: userData.email } });
    if (findUser) throw new HttpException(httpStatus.BAD_REQUEST, 'Email already taken');

    const hashedPassword = await hash(userData.password, 10);

    const createUserData: User = await DB.Users.create({ ...userData, password: hashedPassword });

    const tokenData = await this.Token.generateAuthTokens(createUserData);

    return { tokenData, user: createUserData };
  }

  public async login(userData: CreateUserDto): Promise<{
    tokenData: TokenObj;
    user: User;
  }> {
    const findUser: User = await DB.Users.findOne({ where: { email: userData.email } });
    if (!findUser) throw new HttpException(httpStatus.UNAUTHORIZED, 'Incorrect email or password');

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);

    if (!isPasswordMatching) throw new HttpException(httpStatus.UNAUTHORIZED, 'Incorrect email or password');

    const tokenData = await this.Token.generateAuthTokens(findUser);

    return { tokenData, user: findUser };
  }

  public async logout(userData: User, refreshToken: string): Promise<void> {
    await DB.Tokens.destroy({ where: { token: refreshToken, type: TokenTypes.REFRESH, user_id: userData.id } });
  }

  public async refreshAuth(refreshToken: string): Promise<TokenObj> {
    const verifiedToken = await this.Token.verifyToken(refreshToken, TokenTypes.REFRESH);

    if (!verifiedToken) throw new HttpException(httpStatus.UNAUTHORIZED, 'Invalid token');

    const findUser: User = await DB.Users.findByPk(verifiedToken.user_id);

    if (!findUser) throw new HttpException(httpStatus.UNAUTHORIZED, 'Invalid token');

    const tokenData = await this.Token.generateAuthTokens(findUser);

    return tokenData;
  }

  public async verifyEmail(token: string): Promise<void> {
    const verifiedToken = await this.Token.verifyToken(token, TokenTypes.VERIFY_EMAIL);

    if (!verifiedToken) throw new HttpException(httpStatus.UNAUTHORIZED, 'Invalid token');

    const findUser: User = await DB.Users.findByPk(verifiedToken.user_id);

    if (!findUser) throw new HttpException(httpStatus.UNAUTHORIZED, 'Invalid token');

    await DB.Users.update({ is_email_verified: true }, { where: { id: findUser.id } });
  }

  public async resetPassword(token: string, password: string): Promise<void> {
    const verifiedToken = await this.Token.verifyToken(token, TokenTypes.RESET_PASSWORD);

    if (!verifiedToken) throw new HttpException(httpStatus.UNAUTHORIZED, 'Invalid token');

    const findUser: User = await DB.Users.findByPk(verifiedToken.user_id);

    if (!findUser) throw new HttpException(httpStatus.UNAUTHORIZED, 'Invalid token');

    const hashedPassword = await hash(password, 10);

    await DB.Users.update({ password: hashedPassword }, { where: { id: findUser.id } });
  }

  public async forgotPassword(email: string): Promise<void> {
    const findUser: User = await DB.Users.findOne({ where: { email } });

    if (!findUser) throw new HttpException(httpStatus.UNAUTHORIZED, 'Invalid email');

    const token = await this.Token.generateResetPasswordToken(findUser);
    await this.Email.sendResetPasswordEmail(findUser.email, token.token);
  }

  public async resendVerificationEmail(email: string): Promise<void> {
    const findUser: User = await DB.Users.findOne({ where: { email } });

    if (!findUser) throw new HttpException(httpStatus.UNAUTHORIZED, 'Invalid email');

    const token = await this.Token.generateVerifyEmailToken(findUser);

    await this.Email.sendVerificationEmail(findUser.email, token.token);
  }
}
