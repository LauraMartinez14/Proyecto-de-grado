import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { getNotificationsService } from "../../store/slices/notifications/notification.service";
import { formatDateMoment } from "../../utils";
import { INotification } from "../../types/notification.type";

const NotificationsPage = () => {

  const dispatch = useAppDispatch();

  const { notifications, loading, error } = useAppSelector((state) => state.notifications);

  // const loadNotifications = useCallback(() => {
  //   console.log('cargando notificaciones')
  // }, [dispatch]);
  
  useEffect(() => {
    console.log('cargando notificaciones')
    dispatch(getNotificationsService());
    // loadNotifications();
  }, [dispatch]);

  const handleOnClickNotification = (notification: INotification) => {
    console.log('notification', notification);
    // dispatch(notificationActions.setNotificationSelected(notification));
  }
  

  return (
    <div>
      <h2 className="text-xl font-bold text-[#173555] pt-8 pb-6">Notificaciones</h2>
      <div className="bg-white p-6 rounded-xl">
        <div className="rounded-xl overflow-hidden border border-[#173555]">
          <table className="min-w-full table-auto border-collapse text-center">
            <thead className="bg-[#C4D2E7] text-[#173555]">
              <tr>
                <th className="py-2 px-4 border-b border-r border-[#173555]">Fecha/Hora</th>
                <th className="py-2 px-4 border-b border-r border-[#173555]">Tipo</th>
                <th className="py-2 px-4 border-b border-r border-[#173555]">Descripción</th>
                <th className="py-2 px-4 border-b border-[#173555]">Estado</th>
              </tr>
            </thead>
            <tbody>
              {/* {data.map((row, index) => {
                const isLast = index === data.length - 1;
                const borderBottom = isLast ? '' : 'border-b';

                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className={`py-2 px-4 border-r border-[#173555] text-center ${borderBottom}`}>{row.fecha}</td>
                    <td className={`py-2 px-4 border-r border-[#173555] text-center ${borderBottom}`}>{row.tipo}</td>
                    <td className={`py-2 px-4 border-r border-[#173555] text-left ${borderBottom}`}>{row.descripcion}</td>
                    <td className={`py-2 px-4 border-[#173555] text-center ${borderBottom}`}>{row.estado}</td>
                  </tr>
                );
              })} */}
              {
                loading && (
                  <tr>
                    <td colSpan={4} className="text-center">Cargando notificaciones...</td>
                  </tr>
                )
              }
              {
                error && (
                  <tr>
                    <td colSpan={4} className="text-center">Error al cargar notificaciones</td>
                  </tr>
                )
              }

              {
                notifications.length === 0 && !loading && !error && (
                  <tr>
                    <td colSpan={4} className="text-center">No hay notificaciones</td>
                  </tr>
                )
              }
              {
                notifications.map((notification) => {
                  // const isLast =
                  return (
                    <tr
                      key={notification.id}
                      onClick={() => handleOnClickNotification(notification)}
                      className="hover:bg-gray-50 cursor-pointer"
                    >
                      <td>{formatDateMoment(new Date(notification.createdAt))}</td>
                      <td>{notification.type}</td>
                      <td>{notification.detail}</td>
                      <td>{notification.state}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
