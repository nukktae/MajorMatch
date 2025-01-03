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

      // Get current profile first
      const currentProfile = await profileService.getProfile();
      const currentResults = currentProfile.assessment_results || [];
      
      // Append new result to existing results
      const updatedResults = [...currentResults, assessmentResult];
      
      const updatedProfile = await profileService.updateAssessment(updatedResults);
      return updatedProfile;
    } catch (err) {
      console.error('Failed to save assessment results:', err);
      throw new Error('Failed to save your assessment results. Please try again.');
    }
  }
}; 