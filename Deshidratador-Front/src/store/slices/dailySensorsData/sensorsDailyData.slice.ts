import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { temperatureData } from "../../../types/temperatureData";
import { HumidityData } from "../../../types/humidityData";
import { SendSensorDataType } from "../sensorsData";

type SensorsDataSliceState = {
    tempData: temperatureData[]
    humiData: HumidityData[]
    isLoading: boolean;
    success: boolean;
    message: string | null
}

const initialState: SensorsDataSliceState = {
    tempData: [],
    humiData: [],
    isLoading:false,
    success: true,
    message: null
}

export const sensorsDailyDataSlice = createSlice({
    name: 'sensorsDailyData',
    initialState, 
    reducers: {
        setHumiData: (state, action: PayloadAction<HumidityData[]>) => {
            state.humiData = action.payload
        },
        setTempData: (state, action: PayloadAction<temperatureData[]>) => {
            state.tempData = action.payload
        },
        setIsLoading: (state, action : PayloadAction<boolean>) => {
            state.isLoading = action.payload
        }, 
        setMessage: (state, action: PayloadAction<string | null>) => {
            state.message = action.payload
        },
        clean: (state) => {
            state.isLoading = false   
            state.success = true
            state.message = null
        },
        addSensorRecords: (state, action: PayloadAction<SendSensorDataType>) => {
            const temp: temperatureData = {
                hour: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                temperature: action.payload.temperature
            };
            const humi: HumidityData = {
                hour: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                humidity: action.payload.humidity
            };

            // radiation
            state.tempData = [...state.tempData, temp];
            state.humiData = [...state.humiData, humi];
        },
    }
})

export const sensorsDailyDataActions = sensorsDailyDataSlice.actions

export const sensorsDailyDataReducer = sensorsDailyDataSlice.reducer