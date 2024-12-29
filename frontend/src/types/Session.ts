export interface Session {
  id: string;
  mentorId: string;
  studentId: string;
  date: Date;
  time: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  meetingLink?: string;
  message: string;
  studentName: string;
  mentorName: string;
  studentEmail: string;
  mentorEmail: string;
} 