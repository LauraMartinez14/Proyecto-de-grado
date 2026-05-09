import { configureStore } from "@reduxjs/toolkit";
import { sensorsDataReducer } from "./slices/sensorsData";
import { sensorsDailyDataReducer } from "./slices/dailySensorsData/sensorsDailyData.slice";
import { notificationReducer } from "./slices/notifications/notification.slice";

export const store = configureStore({
	reducer: {
		sensorsData: sensorsDataReducer,
		sensorsDailyData: sensorsDailyDataReducer,
		notifications: notificationReducer,
	},
	
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;