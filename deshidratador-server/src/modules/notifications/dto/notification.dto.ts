export interface CreateNotificationDto {
  detail: string;
  type: 'alert' | 'info';
  sensorRecordId: number;
  state?: 'pendiente' | 'atendido';
  [key: string]: any; // Añadir firma de índice para satisfacer Sequelize
  [key: symbol]: any;
}

export interface UpdateNotificationDto {
  state: 'pending' | 'attended';
}
