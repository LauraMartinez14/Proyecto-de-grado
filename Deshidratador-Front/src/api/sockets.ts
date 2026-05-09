import { connect } from "socket.io-client";

const SOCKET_SERVER_URL = 'http://localhost:3000';

export const socket = connect(SOCKET_SERVER_URL);