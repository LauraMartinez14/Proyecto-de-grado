import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INotification } from "../../../types/notification.type";

type NotificationState = {
  notifications: INotification[]
  notificationSelected: INotification | null
  // common
  loading: boolean
  error: string | null
  success: boolean
}

const initialState: NotificationState = {
  notifications: [],
  notificationSelected: null,
  loading: false,
  error: null,
  success: false,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<INotification>) => {
      state.notifications = [action.payload, ...state.notifications ];
    },
    setNotifications: (state, action: PayloadAction<INotification[]>) => {
      state.notifications = action.payload;
    },
    setNotificationSelected: (state, action: PayloadAction<INotification>) => {
      state.notificationSelected = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setSuccess: (state, action: PayloadAction<boolean>) => {
      state.success = action.payload;
    },
    clean: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
});

export const notificationActions = notificationSlice.actions;

export const notificationReducer = notificationSlice.reducer;
