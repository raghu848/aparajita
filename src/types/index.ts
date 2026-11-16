export interface CoutureLook {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  silhouette: string;
  fabric: string;
  craftsmanship: string;
  hours: number;
  image: string;
  aspectRatio?: string;
  quote?: string;
  details?: string[];
}

export interface CraftDetail {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  karigarTime: string;
  provenance: string;
}

export interface Hotspot {
  id: string;
  x: number; // percentage
  y: number; // percentage
  title: string;
  description: string;
  technique: string;
}

export interface SalonLocation {
  city: string;
  country: string;
  address: string;
  appointmentOnly: boolean;
  phone: string;
  email: string;
  whatsapp?: string;
  mapUrl?: string;
  isFlagship?: boolean;
}
