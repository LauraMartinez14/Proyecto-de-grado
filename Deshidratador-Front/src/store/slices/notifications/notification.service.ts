import { Dispatch } from "@reduxjs/toolkit";

import { notificationActions } from "./notification.slice";

import api from "../../../api/axios";

import { INotification } from "../../../types/notification.type";
import { IAPIResponse } from "../../../types/api.type";

export const getNotificationsService = () => async (dispatch: Dispatch): Promise<void> => {
  try {
    dispatch(notificationActions.setLoading(true));
    const {data, status, config} = await api.get<IAPIResponse<INotification[]>>('/notifications');
    
    console.log('data', data)
    console.log('status', status)
    console.log('config', config)
    
    if (status === 200 && data.ok) {
      dispatch(notificationActions.setNotifications(data.data));
    } else {
      dispatch(notificationActions.setError(data.message));
    }
  } catch (error) {
    console.error('Error fetching notifications:', error);
    dispatch(notificationActions.setError('Error fetching notifications'));
  } finally {
    dispatch(notificationActions.setLoading(false));
  }
}
