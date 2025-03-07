import { Quote } from '../types/quote';

export const mockQuotes: Quote[] = [
  {
    id: '1',
    reference: 'QT-2024-001',
    client: 'Entreprise Martin SARL',
    requestDate: '2024-03-01',
    status: 'quoted',
    data: {
      duration: 12,
      base: 79.53,
      hph: 105.54,
      hch: 94.00,
      hpe: 73.56,
      hce: 59.93,
      c25: 0.55,
      c26: 0.55,
      c27: 0.55,
      c28: 0.55,
      c29: 0.55,
      subscription: 360,
      startDate: '2026-01-01',
      contractDeadline: '2025-03-09'
    }
  },
  {
    id: '2',
    reference: 'QT-2024-002',
    client: 'Dupont Industries',
    requestDate: '2024-03-02',
    status: 'quoted',
    data: {
      duration: 24,
      base: 77.85,
      hph: 105.41,
      hch: 93.90,
      hpe: 69.34,
      hce: 58.42,
      c25: 0.55,
      c26: 0.55,
      c27: 0.55,
      c28: 0.55,
      c29: 0.55,
      subscription: 360,
      startDate: '2026-01-01',
      contractDeadline: '2025-03-09'
    }
  },
  {
    id: '3',
    reference: 'QT-2024-003',
    client: 'Société Générale de Construction',
    requestDate: '2024-03-03',
    status: 'pending',
    data: {
      duration: 36,
      base: 78.57,
      hph: 106.49,
      hch: 91.31,
      hpe: 73.28,
      hce: 57.92,
      c25: 0.55,
      c26: 0.55,
      c27: 0.55,
      c28: 0.55,
      c29: 0.55,
      subscription: 360,
      startDate: '2026-01-01',
      contractDeadline: '2025-03-09'
    }
  }
];