import { Request, Response } from 'express';
import { NotificationService } from './notification.service';

export class NotificationController {
  private notificationService: NotificationService;

  constructor() {
    this.notificationService = new NotificationService();
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const notification = await this.notificationService.create(req.body);
      if (!notification.ok) {
        res.status(400).json(notification);
        return;
      }
      res.status(201).json(notification);
    } catch (error) {
      res.status(400).json({ message: 'Error al crear la notificación', error });
    }
  }

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const notifications = await this.notificationService.findAll();
      
      if (!notifications.ok) {
        res.status(400).json(notifications);
        return;
      }

      res.status(200).json(notifications);
    } catch (error) {
      console.error('Error al obtener las notificaciones', error);
      res.status(500).json({ message: 'Error al obtener las notificaciones' });
    }
  }

  async findById(req: Request, res: Response): Promise<void> {
    try {
      const notification = await this.notificationService.findById(Number(req.params.id));

      if (!notification) {
        res.status(404).json(notification);
        return;
      }

      res.json(notification);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener la notificación', error });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data = req.body;

      if (!id || !data) {
        res.status(400).json({ message: 'ID y datos son requeridos' });
        return;
      }

      const notification = await this.notificationService.update(Number(id), data);
      
      if (!notification.ok) {
        res.status(404).json(notification);
        return;
      }

      res.json(notification);
    } catch (error) {
      res.status(400).json({ message: 'Error al actualizar la notificación', error });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const deleted = await this.notificationService.delete(Number(req.params.id));
      
      if (!deleted.ok) {
        res.status(404).json(deleted);
        return;
      }
      
      res.status(204).send(deleted);
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar la notificación', error });
    }
  }

  async findPending(req: Request, res: Response): Promise<void> {
    try {
      const notifications = await this.notificationService.findPending();
      if (!notifications.ok) {
        res.status(400).json(notifications);
        return;
      }
      res.json(notifications.data);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener las notificaciones pendientes', error });
    }
  }
}