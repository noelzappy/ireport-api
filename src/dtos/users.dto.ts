import { IDTypes } from '@/interfaces/users.interface';
import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  public password: string;
}

export class UpdateUserDto {
  @IsString()
  public name: string;

  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

  @IsString()
  public phone: string;

  @IsString()
  public idNumber: string;

  @IsString()
  public idType: IDTypes;
}

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}
export class LogoutUserDto {
  @IsString()
  @IsNotEmpty()
  public refreshToken: string;
}

export class ForgotPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  public email: string;
}

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  public token: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}

export class VerifyEmailDto {
  @IsString()
  @IsNotEmpty()
  public token: string;
}
