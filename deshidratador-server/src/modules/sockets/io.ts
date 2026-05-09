import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";

let io: Server;
type SOCKET_CHANNELS = "recive_sensor_data" | "send_sensor_data" | "recive_config_data" | "send_config_data" | 'new_notification' | 'sent_data';

export const initSocketServer = (server: HttpServer): void => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: false
    },
    allowEIO3: true,
    transports: ['websocket', 'polling']
  });

  io.on("connection", (socket: Socket) => {
    console.log("Cliente conectado:", socket.id);

    socket.on<SOCKET_CHANNELS>("recive_sensor_data", (data) => {
      console.log("Datos recibidos del ESP32:", data);

      socket.broadcast.emit("send_sensor_data", {
        ...data,
        timestamp: new Date(),
      });
    });

    socket.on<SOCKET_CHANNELS>("recive_config_data", (data) => {
      console.log("Datos de configuracion recibidos:", data);

      socket.broadcast.emit("send_config_data", {
        ...data,
      });
    });
  });
};

export const getIO = (): Server => {
  if (!io) throw new Error("Socket.IO no ha sido inicializado aún.");
  return io;
};

export const broadcastDataToClients = async <DataType>(event: SOCKET_CHANNELS, data: DataType): Promise<void> => {
  const serverIO = getIO();
  console.log(`\n\n\n\n\n\\nEnviando datos: ${event} \n ${JSON.stringify(data)}`);

  await serverIO.emit(event, {
    ...data,
  });
};