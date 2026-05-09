// src/models/sensors.model.ts

import { CreationOptional, DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/database.config';

interface SensorAttributes {
  id: number;
  temperature: number;
  humidity: number;
  uvIndex: number;
  air: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SensorCreationAttributes extends Optional<SensorAttributes, 'id'> {}

class Sensor extends Model<SensorAttributes, SensorCreationAttributes>
  implements SensorAttributes
{
  public id!: number;
  public air!: number
  public uvIndex!: number;
  public humidity!: number
  public temperature!: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Sensor.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    temperature: {
      type: DataTypes.FLOAT(5, 2), 
      allowNull: false,
      defaultValue: 0,
    },
    humidity: {
      type: DataTypes.FLOAT(5, 2),
      allowNull: false,
      defaultValue: 0,
    },
    uvIndex: {
      type: DataTypes.FLOAT(5, 2),
      allowNull: false,
      defaultValue: 0,
    },
    air: {
      type: DataTypes.FLOAT(5, 2),
      allowNull: false,
      defaultValue: 0,
    }
  },
  {
    sequelize,
    tableName: 'sensors',
    timestamps: true,
  }
);

export default Sensor;
