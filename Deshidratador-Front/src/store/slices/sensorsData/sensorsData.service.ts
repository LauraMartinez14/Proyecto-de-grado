import { Dispatch } from "@reduxjs/toolkit";
import { sensorsDataActions } from "./sensorsData.slice";
import { sensorsData } from "../../../types/sensorsData";
import { formatDate, formatToYYYYMMDD } from "../../../utils";
import api from "../../../api/axios";
import { presetsData } from "../../../types/presetsData";


const API_URL = 'http://localhost:3000/api'

interface BackendSensorData {
  id: number;
  temperature: number;
  humidity: number;
  air: number;
  createdAt: string;
  updatedAt: string;
}

interface BackendResponse<Datatype> {
  data: Datatype;
  message: string;
  ok: boolean;
}

export const getAllData = () => async (dispatch: Dispatch) => {
  try {
    dispatch(sensorsDataActions.clean());
    dispatch(sensorsDataActions.setIsLoading(true));

    // Obtener fecha actual y fecha de hace 7 días
    // const now = new Date();
    // const sevenDaysAgo = new Date();
    // sevenDaysAgo.setDate(now.getDate() - 7);

    // const toDate = formatToYYYYMMDD(now);
    // const fromDate = formatToYYYYMMDD(sevenDaysAgo);

    const response = await api.get("/sensors");

    const backendData: BackendResponse<BackendSensorData[]> = response.data;

    const transformedData: sensorsData[] = backendData.data.map((item) => ({
      temperature: item.temperature,
      humidity: item.humidity,
      date: formatDate(item.createdAt),
    }));

    dispatch(sensorsDataActions.setData(transformedData));
  } catch (error) {
    console.error("Error fetching sensor data:", error);
    dispatch(sensorsDataActions.setMessage("Failed to load sensor data"));
  } finally {
    dispatch(sensorsDataActions.setIsLoading(false));
  }
};

export const getDataAverage = () => async (dispatch: Dispatch) => {
  try {
    dispatch(sensorsDataActions.clean());
    dispatch(sensorsDataActions.setIsLoading(true));

    // Obtener fecha actual y fecha de hace 7 días
    const now = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 7);

    const toDate = formatToYYYYMMDD(now);
    const fromDate = formatToYYYYMMDD(sevenDaysAgo);

    const response = await api.post("/sensors/average", {
      from: fromDate,
      to: toDate
    });

    const backendData: BackendResponse<BackendSensorData[]> = response.data;

    const transformedData: sensorsData[] = backendData.data.map((item) => ({
      temperature: item.temperature,
      humidity: item.humidity,
      date: formatDate(item.createdAt),
    }));

    dispatch(sensorsDataActions.setData(transformedData));
  } catch (error) {
    console.error('Errorn getting data average:', error);
    dispatch(sensorsDataActions.setMessage("Failed to load data average"));
  } finally {
    dispatch(sensorsDataActions.setIsLoading(false));
  }
}

export const sendConfigPresetFruitData = (preset: presetsData) => async (dispatch: Dispatch) => {
  try {
    dispatch(sensorsDataActions.clean());
    dispatch(sensorsDataActions.setIsLoading(true));
    const {data, status} = await api.post(`${API_URL}/sendData/changePreset`, preset);

    if (status === 200 && data.ok) {
      dispatch(sensorsDataActions.setMessage("Config preset fruit data sent successfully"));
    } else {
      dispatch(sensorsDataActions.setMessage("Failed to send config preset fruit data"));
    }

  } catch (error) {
    console.error("Error sending config preset fruit data:", error);
    dispatch(sensorsDataActions.setMessage("Failed to send config preset fruit data"));
  } finally {
    dispatch(sensorsDataActions.setIsLoading(false));
  }
}

export const getLastSensorData = () => async (dispatch: Dispatch) => {
  try {
    dispatch(sensorsDataActions.clean());
    dispatch(sensorsDataActions.setIsLoading(true));

    const response = await api.post("/sensors/last");

    const backendData: BackendResponse<BackendSensorData> = response.data;

    if (backendData.ok) {
      dispatch(sensorsDataActions.setCurrentData({
        temperature: backendData.data.temperature,
        humidity: backendData.data.humidity,
        air: backendData.data.air,
      }))
    } else {
      dispatch(sensorsDataActions.setMessage("Failed to load last sensor data"));
      dispatch(sensorsDataActions.setCurrentData({
        temperature: 0,
        humidity: 0,
        air: 0,
      }))
    }
  } catch (error) {
    console.error("Error fetching last sensor data:", error);
    dispatch(sensorsDataActions.setMessage("Failed to load last sensor data"));
  } finally {
    dispatch(sensorsDataActions.setIsLoading(false));
  }
}
