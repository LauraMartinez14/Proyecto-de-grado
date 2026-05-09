import {Request, Response, Router} from'express';
import SensorsController from './environmentalSensorData.controller';

const router = Router();

router.get('/', SensorsController.getAllEnvironmentalSensorData)
router.get('/:id', SensorsController.getEnvironmentalSensorDataById)
router.post('/', SensorsController.createEnvironmentalSensorData)
router.put('/:id', SensorsController.updateEnvironmentalSensorData)
router.delete('/:id', SensorsController.deleteEnvironmentalSensorData)
router.post('/average', SensorsController.getAverageEnvironmentalSensorData)
router.post('/last', SensorsController.getLastEnvironmentalSensorData)

export default router;