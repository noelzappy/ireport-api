import { Response } from 'express';
import { RequestWithUser } from '@interfaces/auth.interface';
import { Container } from 'typedi';
import { UpdateUserDto } from '@dtos/users.dto';
// import { User } from '@interfaces/users.interface';
import { UserService } from '@services/users.service';
import catchAsync from '@/utils/catchAsync';
import httpStatus from 'http-status';

export class UserController {
  public user = Container.get(UserService);

  public getMe = catchAsync(async (req: RequestWithUser, res: Response) => {
    const user = await this.user.findUserById(req.user.id);

    res.status(httpStatus.OK).send(user);
  });

  public updateMe = catchAsync(async (req: RequestWithUser, res: Response) => {
    const userData: UpdateUserDto = req.body;
    const user = await this.user.updateUser(req.user.id, userData);

    res.status(httpStatus.OK).send(user);
  });
}
