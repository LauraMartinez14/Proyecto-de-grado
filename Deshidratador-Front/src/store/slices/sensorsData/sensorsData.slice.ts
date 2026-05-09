import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sensorsData } from "../../../types/sensorsData";

type SensorsDataSliceState = {
    data: Array<sensorsData>
    // current sensors data
    temperature: number;
    humidity: number;
    air: number;
    isLoading: boolean;
    success: boolean;
    message: string | null
}

export interface SendSensorDataType {
    temperature: number
    humidity: number
    air: number
}

const initialState: SensorsDataSliceState = {
    data: [],
    temperature: 0,
    humidity: 0,
    air: 0,
    isLoading:false,
    success: true,
    message: null,
}

export const SensorsDataSlice = createSlice({
    name: 'sensorsData',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<sensorsData[]>) => {
            state.data = action.payload;
        },
        setCurrentData: (state, action: PayloadAction<SendSensorDataType>) => {
            state.temperature = action.payload.temperature
            state.humidity = action.payload.humidity
            state.air = action.payload.air
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
        }
    }
})

export const sensorsDataActions = SensorsDataSlice.actions

export const sensorsDataReducer = SensorsDataSlice.reducer