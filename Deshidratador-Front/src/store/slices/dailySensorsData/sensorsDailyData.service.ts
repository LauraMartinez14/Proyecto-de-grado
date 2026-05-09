import { Dispatch } from "@reduxjs/toolkit";
import { temperatureData } from "../../../types/temperatureData";
import { formatTime } from "../../../utils";
// import sensorData from "../../../assets/data/sensors.json";
import { sensorsDailyDataActions } from "./sensorsDailyData.slice";
import api from "../../../api/axios";
import { HumidityData } from "../../../types/humidityData";

interface BackendSensorData {
  id: number;
  temperature: number;
  humidity: number;
  createdAt: string;
  updatedAt: string;
}

interface BackendResponse {
  data: BackendSensorData[];
  message: string;
  ok: boolean;
}

export const getTemperatureData = () => async (dispatch: Dispatch) => {
  try {
    // llamada a ep
    dispatch(sensorsDailyDataActions.clean())
    dispatch(sensorsDailyDataActions.setIsLoading(true));

    const response = await api.get("/sensors");
    const backendData: BackendResponse = response.data;
    
    // const backendData = sensorData as BackendResponse;

    const transformedData: temperatureData[] = backendData.data.map((item) => ({
      hour: formatTime(item.createdAt),
      temperature: item.temperature,
    }));

    dispatch(sensorsDailyDataActions.setTempData(transformedData));
  } catch (error) {
    console.error("Error fetching sensor data:", error);
  } finally {
    dispatch(sensorsDailyDataActions.setIsLoading(false));
  }
};

export const getHumidityData = () => async (dispatch: Dispatch) => {
  try {
    // llamada a ep
    dispatch(sensorsDailyDataActions.clean())
    dispatch(sensorsDailyDataActions.setIsLoading(true));

    const response = await api.get("/sensors");
    const backendData: BackendResponse = response.data;
    
    // const backendData = sensorData as BackendResponse;

    const transformedData: HumidityData[] = backendData.data.map((item) => ({
      hour: formatTime(item.createdAt),
      humidity: item.humidity,
    }));

    dispatch(sensorsDailyDataActions.setHumiData(transformedData));
  } catch (error) {
    console.error("Error fetching sensor data:", error);
  } finally {
    dispatch(sensorsDailyDataActions.setIsLoading(false));
  }
}