import {Router} from 'express';

import healthRoutes from '../modules/healt/healthy.routes';
import usersRoutes from '../modules/users/users.routes';
import productsRoutes from '../modules/products/products.routes';
import sensorsRoutes from '../modules/environmentalSensorData/environmentalSensorData.routes'
import sendDataRoutes from '../modules/postdata/postdata.router'
import notificationRoutes from '../modules/notifications/notification.routes'

import loginRoutes from '../modules/auth/login.routes'
import signoutRoutes from '../modules/auth/signout.routes'
import refreshTokenRoutes from '../modules/auth/refreshToken.routes'
import userRoutes from '../modules/auth/user.routes'
import { authenticate } from '../modules/auth/authenticate';

const router = Router();

router.use('/check', healthRoutes);
router.use('/users', usersRoutes);
router.use('/products', productsRoutes);
router.use('/sensors', sensorsRoutes);
router.use('/sendData', sendDataRoutes)
router.use('/notifications', notificationRoutes);

router.use('/login', loginRoutes);
router.use('/signout', signoutRoutes);
router.use('/refresh-token', refreshTokenRoutes);
router.use('/user', authenticate, userRoutes);

// default response
router.use('/*', (req, res) => {
  console.log('request /*', req.route);
  res.status(404).send({
    "message": "route not found"
  })
})

export default router;