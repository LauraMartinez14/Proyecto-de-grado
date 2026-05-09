// 17/04/2025 10:00
type DateFormat = 'DD/MM/YYYY HH:mm' | 'DD/MM/YYYY' | 'HH:mm' | 'DD/MM/YYYY HH:mm:ss';

// Función para formatear la fecha
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
};

// funcion para formatear hora
export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
};

// funcion para formatear al formato yyyy-mm-dd
export const formatToYYYYMMDD = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

import moment from "moment";

export const formatDateMoment = (date: Date, format: DateFormat = 'DD/MM/YYYY HH:mm') => {
  return moment(date).format(format);
}
