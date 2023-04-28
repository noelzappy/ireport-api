import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { IDTypes, User } from '@interfaces/users.interface';

export type UserCreationAttributes = Optional<User, 'id'>;
const PROTECTED_ATTRIBUTES = ['password'];

export class UserModel extends Model<User, UserCreationAttributes> implements User {
  declare id: number;
  public email: string;
  public password: string;
  public name: string;
  public firstName: string;
  public lastName: string;
  public phone: string;
  public idNumber: string;
  public idType: IDTypes;
  public isVerified: boolean;
  public isEmailVerified: boolean;
  public role: 'admin' | 'user';

  toJSON() {
    // hide protected fields
    const attributes = Object.assign({}, this.get());
    for (const a of PROTECTED_ATTRIBUTES) {
      delete attributes[a];
    }
    return attributes;
  }

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof UserModel {
  UserModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(45),
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      firstName: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      lastName: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      phone: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      idNumber: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      idType: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      isVerified: {
        allowNull: true,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isEmailVerified: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      role: {
        allowNull: false,
        type: DataTypes.ENUM('admin', 'user'),
        defaultValue: 'user',
      },
    },
    {
      tableName: 'users',
      sequelize,
    },
  );

  return UserModel;
}
