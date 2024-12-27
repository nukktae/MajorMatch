export interface User {
  id: string;
  email: string;
  name: string;
  custom_user_id?: string;
  nickname?: string;
  photo_url?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface UserProfile {
  user_id: string;
  major?: string;
  interests?: string[];
  completed_assessments: number;
  earned_badges: number;
  assessment_results?: Record<string, any>;
  created_at?: Date;
  updated_at?: Date;
} 