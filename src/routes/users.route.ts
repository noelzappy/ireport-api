import { Router } from 'express';
import { UserController } from '@controllers/users.controller';
import { UpdateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@/middlewares/auth.middleware';

export class UserRoute implements Routes {
  public path = '/users';
  public router = Router();
  public user = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/me`, AuthMiddleware(), this.user.getMe);
    this.router.put(`${this.path}/me`, AuthMiddleware(), ValidationMiddleware(UpdateUserDto, 'body', true), this.user.updateMe);

    // this.router.get(`${this.path}/:id(\\d+)`, this.user.getUserById);
    // this.router.post(`${this.path}`, ValidationMiddleware(CreateUserDto), this.user.createUser);
    // this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(CreateUserDto), this.user.updateUser);
    // this.router.delete(`${this.path}/:id(\\d+)`, this.user.deleteUser);
  }
}
