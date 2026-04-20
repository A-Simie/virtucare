export interface LabResult {
  id: string;
  testName: string;
  category: 'Blood' | 'Cardiology' | 'Metabolic' | 'General';
  date: string;
  result: string;
  unit: string;
  range: string;
  status: 'Normal' | 'High' | 'Low' | 'Critical';
  doctor: string;
}

export interface HealthMetric {
  label: string;
  value: number;
  unit: string;
  date: string;
}

export const medicalReports: LabResult[] = [
  {
    id: 'LAB-001',
    testName: 'Hemoglobin A1c',
    category: 'Metabolic',
    date: '2026-04-12',
    result: '5.4',
    unit: '%',
    range: '4.0 - 5.6',
    status: 'Normal',
    doctor: 'Dr. Sofia Chen'
  },
  {
    id: 'LAB-002',
    testName: 'Total Cholesterol',
    category: 'Blood',
    date: '2026-04-12',
    result: '185',
    unit: 'mg/dL',
    range: '< 200',
    status: 'Normal',
    doctor: 'Dr. Sofia Chen'
  },
  {
    id: 'LAB-003',
    testName: 'Low-Density Lipoprotein (LDL)',
    category: 'Blood',
    date: '2026-04-12',
    result: '112',
    unit: 'mg/dL',
    range: '< 100',
    status: 'High',
    doctor: 'Dr. Sofia Chen'
  },
  {
    id: 'LAB-004',
    testName: 'Vitamin D, 25-Hydroxy',
    category: 'General',
    date: '2026-03-25',
    result: '28',
    unit: 'ng/mL',
    range: '30 - 100',
    status: 'Low',
    doctor: 'Dr. James Wilson'
  },
  {
    id: 'LAB-005',
    testName: 'Blood Pressure (Systolic)',
    category: 'Cardiology',
    date: '2026-04-15',
    result: '122',
    unit: 'mmHg',
    range: '90 - 120',
    status: 'Normal',
    doctor: 'Dr. David Lin'
  }
];

export const glucoseTrends: HealthMetric[] = [
  { label: 'Jan', value: 98, unit: 'mg/dL', date: '2026-01-15' },
  { label: 'Feb', value: 102, unit: 'mg/dL', date: '2026-02-15' },
  { label: 'Mar', value: 95, unit: 'mg/dL', date: '2026-03-15' },
  { label: 'Apr', value: 92, unit: 'mg/dL', date: '2026-04-15' },
];

export const bloodPressureTrends: HealthMetric[] = [
  { label: 'Jan', value: 118, unit: 'mmHg', date: '2026-01-15' },
  { label: 'Feb', value: 124, unit: 'mmHg', date: '2026-02-15' },
  { label: 'Mar', value: 121, unit: 'mmHg', date: '2026-03-15' },
  { label: 'Apr', value: 119, unit: 'mmHg', date: '2026-04-15' },
];

export const dietComposition = [
  { label: 'Proteins', value: 30, color: '#10b981' },
  { label: 'Carbs', value: 45, color: '#6366f1' },
  { label: 'Fats', value: 25, color: '#f59e0b' },
];

export const weeklyActivity = [
  { day: 'Mon', steps: 8400 },
  { day: 'Tue', steps: 10200 },
  { day: 'Wed', steps: 7600 },
  { day: 'Thu', steps: 11500 },
  { day: 'Fri', steps: 9800 },
  { day: 'Sat', steps: 12400 },
  { day: 'Sun', steps: 6500 },
];
