import { BrowserRouter, Route, Routes } from "react-router";
import { useEffect } from "react";
import "./App.css";

import { useAppDispatch } from "./hooks/store";
import { SendSensorDataType, sensorsDataActions } from "./store/slices/sensorsData";
import { notificationActions } from "./store/slices/notifications/notification.slice";

import NotificationsPage from "./pages/NotificationsPage/NotificationsPage";
import LayoutDashboard from "./pages/LayoutDashboard/LayoutDashboard";
import ReportsPage from "./pages/ReportsPage/ReportsPage";
import StatsPage from "./pages/StatsPage/StatsPage";
import HomePage from "./pages/HomePage/HomePage";

import { socket } from "./api/sockets";
import { SOCKET_CHANNELS } from "./types/sockets";
import { INotification } from "./types/notification.type";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected');
    });
    
    socket.on('disconnect', () => {
      console.log('disconnected');
    });

    socket.on<SOCKET_CHANNELS>('send_sensor_data', (data: SendSensorDataType) => {
      console.log('sensor_data from server', data);
      dispatch(sensorsDataActions.setCurrentData(data))
    });

    socket.on<SOCKET_CHANNELS>('send_config_data', (data) => {
      console.log('config_data to server', data);
    });

    socket.on<SOCKET_CHANNELS>('new_notification', (data: INotification) => {
      console.log('new_notification from server', data);
      dispatch(notificationActions.addNotification(data));
    }); 

    return () => {
      socket.off('send_sensor_data');
      socket.off('send_config_data');
      socket.off('new_notification');
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, socket]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutDashboard/>}>
          <Route index element={<HomePage/>}/>
          <Route path="reportes" element={<ReportsPage/>}/>
          <Route path="estadisticas" element={<StatsPage/>}/>
          <Route path="notificaciones" element={<NotificationsPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
