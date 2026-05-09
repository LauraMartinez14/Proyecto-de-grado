import { Request, Response } from "express";
import { broadcastDataToClients } from "../sockets/io";
import { IServiceResponse } from "../../types";

export function postSendDataWebSocketController(req: Request, res: Response) {
    const datos = req.body;
  
    broadcastDataToClients("send_sensor_data", datos)

    return res.status(200).json({
      data: null,
      message: 'Sensor data sent',
      ok: true
    });
  }

export const reciveConfigDataController = async (req: Request, res: Response) => {
  try {
    const datos = req.body;

    console.log('change preset', datos)
  
    await broadcastDataToClients("send_config_data", datos)
    await broadcastDataToClients("sent_data", datos)
  
    return res.status(200).json({
      data: null,
      message: 'Config data sent',
      ok: true
    });
  } catch (error) {
    console.error('Error sending config data', error);
    return res.status(500).json({
      data: null,
      message: 'Error sending config data',
      ok: false
    });
  }
}
  