// src/models/user.model.ts
import { CreationOptional, DataTypes, Model, Optional } from 'sequelize';
import {sequelize} from '../../config/database.config';
import { generateAccessToken, generateRefreshToken } from '../auth/generateTokens';
import Token from '../auth/token.model';

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  dateOfBirth: Date;
  username: string;
  password: string;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public dateOfBirth!: Date;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  public username!: string;
  public password!: string;

  public createAccessToken(): string {
    return generateAccessToken(this);
  }
  
  public async createRefreshToken(): Promise<string> {
    const refreshToken = generateRefreshToken(this);

    try {
      await Token.create({ token: refreshToken });
      return refreshToken;
    } catch (error) {
      console.log(error);
      throw new Error("No se pudo generar la sesión en la base de datos");
    }
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
        is: /^[a-zA-Z0-9]*$/,
      }
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true,
      }
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(32),
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    }, 
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    }
  },
  {
    sequelize,
    tableName: 'users',
  }
);

export default User;