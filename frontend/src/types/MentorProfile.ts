export interface MentorProfile {
  userId: string;
  completedSessions: number;
  rating: number;
  reviews: {
    studentId: string;
    studentName: string;
    rating: number;
    comment: string;
    date: Date;
  }[];
  availability: {
    day: string;
    slots: string[];
  }[];
  specialties: string[];
  bio: string;
} 