export interface Mentor {
  id: string;
  name: string;
  email: string;
  title: string;
  field: string;
  experience: string;
  availability: string;
  specialties: string[];
  rating: number;
  imageUrl: string;
  about?: string;
} 