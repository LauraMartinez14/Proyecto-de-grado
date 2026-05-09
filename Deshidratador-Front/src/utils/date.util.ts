import moment from "moment";

// 17/04/2025 10:00
type DateFormat = 'DD/MM/YYYY HH:mm' | 'DD/MM/YYYY' | 'HH:mm' | 'DD/MM/YYYY HH:mm:ss';

export const formatDate = (date: Date, format: DateFormat) => {
  return moment(date).format(format);
}
