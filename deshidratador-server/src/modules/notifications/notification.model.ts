import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../../config/database.config';
import Sensor from '../environmentalSensorData/environmentalSensorData.model';

interface NotificationAttributes {
  id: number;
  detail: string;
  type: 'alert' | 'info';
  state: 'pending' | 'attended';
  sensorRecordId: number;
}

export interface NotificationCreationAttributes extends Optional<NotificationAttributes, 'id'> {}

export class Notification extends Model {
  public id!: number;
  public detail!: string;
  public type!: 'alert' | 'info';
  public state!: 'pending' | 'attended';
  public sensorRecordId!: number;
  
  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Notification.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    detail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('alert', 'info'),
      allowNull: false,
    },
    state: {
      type: DataTypes.ENUM('pending', 'attended'),
      allowNull: false,
      defaultValue: 'pending',
    },
    sensorRecordId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'sensors',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Notification',
    tableName: 'notifications',
  }
);

// Definir la relación con Sensor
Notification.belongsTo(Sensor, {
  foreignKey: 'sensorRecordId',
  as: 'sensor',
});
