export interface QuoteData {
  duration: number;
  base: number;
  hph: number;
  hch: number;
  hpe: number;
  hce: number;
  c25: number;
  c26: number;
  c27: number;
  c28: number;
  c29: number;
  subscription: number;
  startDate: string;
  contractDeadline: string;
}

export interface Quote {
  id: string;
  reference: string;
  client: string;
  requestDate: string;
  status: 'pending' | 'quoted' | 'contracted';
  data?: QuoteData;
}