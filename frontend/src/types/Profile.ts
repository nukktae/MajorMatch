export interface Profile {
  name: string;
  email: string;
  major?: string;
  interests?: string[];
  completedAssessments: number;
  earnedBadges: number;
  assessmentResults?: {
    date: string;
    majors: {
      name: string;
      description: string;
      whyGoodFit: string;
      careers: string[];
      skills: string[];
      coursework: string[];
      jobOutlook: string;
      averageSalary: string;
    }[];
  }[];
} 