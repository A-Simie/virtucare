'use client';

import { useLocalStorage } from './useLocalStorage';
import { Appointment } from '@/types/appointment';
import { isSameAppointment } from '@/utils/date-helpers';

export function useAppointments() {
  const [appointments, setAppointments] = useLocalStorage<Appointment[]>('virtucare_appointments', []);

  const bookAppointment = (newAppointment: Omit<Appointment, 'id' | 'createdAt' | 'status'>) => {
    // Double-booking prevention
    const isAlreadyBooked = appointments.some(
      (app) => 
        app.doctorId === newAppointment.doctorId && 
        isSameAppointment(app.date, app.time, newAppointment.date, newAppointment.time) &&
        app.status !== 'cancelled'
    );

    if (isAlreadyBooked) {
      return { success: false, message: 'This slot is already booked for this doctor.' };
    }

    const appointment: Appointment = {
      ...newAppointment,
      id: Math.random().toString(36).substring(2, 9),
      status: 'upcoming',
      createdAt: new Date().toISOString(),
    };

    setAppointments([...appointments, appointment]);
    return { success: true, appointment };
  };

  const cancelAppointment = (id: string) => {
    setAppointments(
      appointments.map((app) => 
        app.id === id ? { ...app, status: 'cancelled' } : app
      )
    );
  };

  return {
    appointments,
    bookAppointment,
    cancelAppointment,
  };
}
