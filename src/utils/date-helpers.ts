import { format, parseISO, isSameDay, startOfDay } from 'date-fns';

export const formatDate = (date: Date | string) => {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, 'MMMM d, yyyy');
};

export const formatTime = (time: string) => {
  // Assuming time is in "HH:mm" or ISO
  try {
    const d = time.includes('T') ? parseISO(time) : new Date(`2000-01-01T${time}`);
    return format(d, 'hh:mm a');
  } catch {
    return time;
  }
};

export const isSameAppointment = (date1: string, time1: string, date2: string, time2: string) => {
  return isSameDay(parseISO(date1), parseISO(date2)) && time1 === time2;
};
