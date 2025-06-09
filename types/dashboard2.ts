// types/dashboard.ts
export interface Lead {
  first_name: string | null;
  last_name: string | null;
  metadata: {
    nursery_name?: string;
    location?: string;
    [key: string]: any;
  } | null;
}

export interface Booking {
  id: string;
  scheduled_at: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  leads: Lead[]; // Note this is an array
}

export interface RecentDemo {
  id: string;
  nursery: string;
  contact: string;
  location: string;
  date: string;
  status: string;
}