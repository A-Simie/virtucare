import { Doctor } from '@/types/doctor';

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. M. Sterling',
    specialty: 'Cardiology',
    rating: 4.9,
    location: 'Heart Center, Wing A',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
    availableSlots: ['2026-04-21T14:00:00Z', '2026-04-21T15:00:00Z', '2026-04-22T09:00:00Z'],
  },
  {
    id: '2',
    name: 'Dr. S. Jenkins',
    specialty: 'Dermatology',
    rating: 4.8,
    location: 'Skin Clinic, Level 2',
    avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop',
    availableSlots: ['2026-04-21T10:00:00Z', '2026-04-21T11:00:00Z', '2026-04-22T14:00:00Z'],
  },
  {
    id: '3',
    name: 'Dr. D. Lin',
    specialty: 'Neurology',
    rating: 5.0,
    location: 'Neuro Dept, Wing B',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop',
    availableSlots: ['2026-04-22T09:00:00Z', '2026-04-22T10:00:00Z', '2026-04-23T11:00:00Z'],
  },
  {
    id: '4',
    name: 'Dr. E. Rodriguez',
    specialty: 'Pediatrics',
    rating: 4.7,
    location: "Children's Ward, Fl 3",
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71f153678f?w=400&h=400&fit=crop',
    availableSlots: ['2026-04-21T16:00:00Z', '2026-04-22T08:00:00Z', '2026-04-23T15:00:00Z'],
  },
  {
    id: '5',
    name: 'Dr. A. Gupta',
    specialty: 'General Practice',
    rating: 4.9,
    location: 'Family Health, Level 1',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop',
    availableSlots: ['2026-04-21T09:00:00Z', '2026-04-22T13:00:00Z', '2026-04-24T10:00:00Z'],
  },
];
