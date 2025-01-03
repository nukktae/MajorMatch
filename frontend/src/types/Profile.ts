export interface Profile {
  id: string;
  email: string;
  display_name?: string;
  photo_url: string | null;
  major: string | null;
  interests: string[];
  completed_assessments: number;
  assessment_results: Array<{
    date: string;
    majors: Array<{
      name: string;
      description: string;
      whyGoodFit: string;
      careers: string[];
      skills: string[];
      coursework: string[];
      jobOutlook: string;
      averageSalary: string;
    }>;
  }> | null;
  custom_user_id?: string;
  nickname?: string;
}