import { Notification } from './notification.model';
import { CreateNotificationDto, UpdateNotificationDto } from './dto/notification.dto';

import { IServiceResponse } from '../../types';
import Sensor from '../environmentalSensorData/environmentalSensorData.model';

export class NotificationService {

  async create(data: CreateNotificationDto): Promise<IServiceResponse<Notification | null>> {
    try {
      const { sensorId, ...rest } = data;

      const sensor = await Sensor.findByPk(sensorId);
      
      if (!sensor) {
        return {
          ok: false,
          data: null,
          message: 'No se encontró el registro del sensor',
        };
      }

      const notification = await Notification.create(data);

      if (!notification) {
        return {
          ok: false,
          data: null,
          message: 'Error al crear la notificación',
        };
      }
  
      return {
        ok: true,
        data: notification,
        message: 'Notificación creada exitosamente',
      };
    } catch (error) {
      console.error('Error al crear la notificación, service', error);
      return {
        ok: false,
        data: null,
        message: 'Error al crear la notificación',
      };
    }
  }

  async findAll(): Promise<IServiceResponse<Notification[] | null>> {
    try {
      const response = await Notification.findAll({
        include: ['sensor'],
        order: [['createdAt', 'DESC']],
      });
      
      if (!response || response.length === 0) {
        return {
          ok: true,
          data: [],
          message: 'No se encontraron notificaciones',
        };
      }
  
      return {
        ok: true,
        data: response,
        message: 'Notificaciones encontradas exitosamente',
      };
    } catch (error) {
      console.error('Error al obtener las notificaciones, service', error);
      return {
        ok: false,
        data: null,
        message: 'Error al obtener las notificaciones',
      };
    }
  }

  async findById(id: number): Promise<IServiceResponse<Notification | null>> {
    const response = await  Notification.findByPk(id, {
      include: ['sensor'],
    });

    if (!response) {
      return {
        ok: false,
        data: null,
        message: 'No se encontró la notificación',
      };
    }

    return {
      ok: true,
      data: response,
      message: 'Notificación encontrada exitosamente',
    };
  }

  async update(id: number, data: UpdateNotificationDto): Promise<IServiceResponse<Notification | null>> {
    try {
      
      // Validar que venga el campo state
      if (!data.state) {
        return {
          data: null,
          ok: false,
          message: 'El campo state es requerido',
        };
      }
  
      // Validar que el valor sea válido
      if (!['pending', 'attended'].includes(data.state)) {
        return {
          data: null,
          ok: false,
          message: 'El valor de state debe ser "pending" o "attended"',
        };
      }
  
      const notification = await Notification.findByPk(id);
      
      if (!notification) {
        return {
          data: null,
          ok: false,
          message: 'No se encontró la notificación',
        };
      }
      
      // Solo actualizar el campo state
      const updatedNotification = await notification.update({
        ...notification,
        state: data.state
      });
      
      return {
        data: updatedNotification,
        ok: true,
        message: 'Estado de notificación actualizado exitosamente',
      };
    } catch (error) {
      console.error('Error al actualizar la notificación, service', error);
      return {
        data: null,
        ok: false,
        message: 'Error al actualizar la notificación',
      };
    }
  }

  async delete(id: number): Promise<IServiceResponse<boolean>> {
    try {
      const notification = await Notification.findByPk(id);
      if (!notification) {
        return {
          data: false,
          ok: false,
          message: 'No se encontró la notificación',
        };
      }
      
      await notification.destroy();
      
      return {
        data: true,
        ok: true,
        message: 'Notificación eliminada exitosamente',
      };
    } catch (error) {
      console.error('Error al eliminar la notificación, service', error);
      return {
        data: false,
        ok: false,
        message: 'Error al eliminar la notificación',
      };
    }
  }

  async findPending(): Promise<IServiceResponse<Notification[]>> {
    const response = await Notification.findAll({
      where: { state: 'pendiente' },
      include: ['sensor'],
    });

    if (!response || response.length === 0) {
      return {
        data: [],
        ok: true,
        message: 'No se encontraron notificaciones pendientes',
      };
    }

    return {
      data: response,
      ok: true,
      message: 'Notificaciones pendientes encontradas exitosamente',
    };
  }
}