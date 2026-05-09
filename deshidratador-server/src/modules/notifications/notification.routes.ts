import { Router } from 'express';
import { NotificationController } from './notification.controller';

const router = Router();
const notificationController = new NotificationController();

// Rutas para notificaciones
router.post('/', (req, res) => notificationController.create(req, res));
router.get('/', (req, res) => notificationController.findAll(req, res));
router.get('/pending', (req, res) => notificationController.findPending(req, res));
router.get('/:id', (req, res) => notificationController.findById(req, res));
router.put('/:id', (req, res) => notificationController.update(req, res));
router.delete('/:id', (req, res) => notificationController.delete(req, res));

export default router;