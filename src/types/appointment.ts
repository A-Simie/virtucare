import { Doctor } from './doctor';

export type AppointmentStatus = 'upcoming' | 'completed' | 'cancelled';

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  date: string; // ISO string
  time: string; // HH:mm format or ISO
  reason: string;
  status: AppointmentStatus;
  createdAt: string;
}
