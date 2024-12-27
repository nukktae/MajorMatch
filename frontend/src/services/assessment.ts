import { profileService } from './profile';
import type { ResultData, Major, AssessmentResult } from '../types/assessment';

export const assessmentService = {
  async saveResults(results: ResultData) {
    try {
      const assessmentResult: AssessmentResult = {
        date: new Date().toISOString(),
        majors: results.majors.map((major: Major) => ({
          name: major.name,
          description: major.description,
          whyGoodFit: major.whyGoodFit,
          careers: major.careers,
          skills: major.skills,
          coursework: major.coursework,
          jobOutlook: major.jobOutlook,
          averageSalary: major.averageSalary
        }))
      };

      const updatedProfile = await profileService.updateAssessmentResults([assessmentResult]);
      return updatedProfile;
    } catch (err) {
      console.error('Failed to save assessment results:', err);
      throw new Error('Failed to save your assessment results. Please try again.');
    }
  }
}; 