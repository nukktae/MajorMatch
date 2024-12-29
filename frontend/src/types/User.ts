export interface User {
  id: string;
  email: string;
  displayName: string;
  role: 'student' | 'mentor';
  photoURL?: string;
  createdAt: Date;
} 