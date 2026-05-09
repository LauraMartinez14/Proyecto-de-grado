import {Request, Response, response} from 'express';
import EnvironmentalSensorDataService from './environmentalSensorData.service'
import { NotificationService } from '../notifications/notification.service';
import { broadcastDataToClients } from '../sockets/io';

const TEMPERATURE_THRESHOLD = 55;

async function getAllEnvironmentalSensorData (_req: Request, res: Response) {
  try {
    const products = await EnvironmentalSensorDataService.getEnvironmentalSensorData()
    return res.json(products);
  } catch (error) {
    console.error('Error getting products');
    return res.status(500).send({
      "message": "error getting products"
    })
  }
}

async function getEnvironmentalSensorDataById (req: Request, res: Response) {
  try {
    const sensorId = req.params.id
  
    const product = await EnvironmentalSensorDataService.getEnvironmentalSensorDataById(+sensorId)
    if (!product.ok) {
      return res.status(404).send(product) 
    }
    return res.json(product);
  }catch(error){
    console.error('error getting product by id', error);
    return res.status(500).send({
      "message": "error getting product by id"
    })
  }
}

async function createEnvironmentalSensorData(req: Request, res: Response) {
  try{
    const rawSensor = req.body

    const product = await EnvironmentalSensorDataService.createEnvironmentalSensorData(rawSensor)

    // console.log('data', product)
    if (product.ok && product.data) {
      const notificationService = new NotificationService();

      await broadcastDataToClients("send_sensor_data", product.data.dataValues)
      // if the temperature is equal or greater than the threshold (55°C), create a notification
      if (product.data.temperature >= TEMPERATURE_THRESHOLD) {
        const notification = await notificationService.create({
          sensorId: product.data.id,
          message: 'Temperatura muy alta',
          detail: `Temperatura muy alta!, la temperatura actual es ${product.data.temperature}°C, maxima permitida ${TEMPERATURE_THRESHOLD}°C`,
          type: 'alert',
          sensorRecordId: product.data.id
        })

        // send notification to the user
        await broadcastDataToClients('new_notification', {
          ...notification.data?.dataValues,
          data: {
            temperature: product.data.temperature,
            humidity: product.data.humidity,
            uvIndex: product.data.uvIndex,
          }
        })
      }
    }
    return res.status(201).json(product)
  }catch(error){
    console.error('error creating product', error);
    return res.status(500).send({
      "message": "error creating product"
    })
  }
}

async function updateEnvironmentalSensorData(req: Request, res: Response) {
  try {
    const sensorId = req.params.id
    const rawSensor = req.body

    const updatedSensor = await EnvironmentalSensorDataService.updateEnvironmentalSensorData(+sensorId, rawSensor)
   
    if (!updatedSensor.ok) {
      return res.status(404).send(updatedSensor)
    }

    return res.status(200).json(updatedSensor)
  }catch (error) {
    console.error('error updating product', error);
    return res.status(500).send({
      "message": "error updating product"
    })
  }
}

async function deleteEnvironmentalSensorData(req: Request, res: Response){
  try{
    const sensorId = req.params.id;

    const response = await EnvironmentalSensorDataService.deleteEnvironmentalSensorData(+sensorId)
    
    if (!response.ok) {
      return res.status(404).send(response)
    }

    return res.status(200).json(response)
  }catch(error){
    console.error('error deleting product', error);
    return res.status(500).send({
      "message": "error deleting product"
    })
  }
}

async function getAverageEnvironmentalSensorData(req: Request, res: Response) {
  try {
    const { from, to } = req.body;

    if(!from || !to) {
      return res.status(400).send({
        "message": "from and to are required"
      })
    }

    const averageData = await EnvironmentalSensorDataService.getAverageEnvironmentalSensorData(from, to);
    return res.json(averageData)
  } catch (error) {
    console.error('error getting average data', error);
    return res.status(500).send({
      "message": "error getting average data"
    })
  }
}

async function getLastEnvironmentalSensorData(req: Request, res: Response) {
  try {
    const lastData = await EnvironmentalSensorDataService.getLastEnvironmentalSensorData();
    if (!lastData.ok) {
      return res.status(404).send(lastData)
    }

    return res.status(200).json(lastData);
  } catch (error) {
    console.error('error getting last data', error);
    return res.status(500).send({
      "message": "error getting last data"
    })
  }
}

export default {
  getAllEnvironmentalSensorData,
  getEnvironmentalSensorDataById,
  createEnvironmentalSensorData,
  updateEnvironmentalSensorData,
  deleteEnvironmentalSensorData,
  getAverageEnvironmentalSensorData,
  getLastEnvironmentalSensorData
}