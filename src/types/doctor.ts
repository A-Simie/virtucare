export type Specialty = 'Cardiology' | 'Dermatology' | 'Neurology' | 'Pediatrics' | 'General Practice';

export interface Doctor {
  id: string;
  name: string;
  specialty: Specialty;
  rating: number;
  location: string;
  avatar: string;
  available: boolean;
  availableSlots: string[];
}
