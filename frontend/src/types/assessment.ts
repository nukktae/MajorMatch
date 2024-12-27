export interface Major {
  name: string;
  description: string;
  whyGoodFit: string;
  careers: string[];
  skills: string[];
  coursework: string[];
  jobOutlook: string;
  averageSalary: string;
}

export interface ResultData {
  majors: Major[];
}

export interface AssessmentResult {
  date: string;
  majors: Major[];
} 