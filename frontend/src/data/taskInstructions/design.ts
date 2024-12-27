import { TaskInstruction } from '../../types/taskInstruction';

export const designInstructions: Record<string, TaskInstruction> = {
  'Portfolio Strategy': {
    steps: [
      'Review successful design portfolios in your target industry',
      'Identify 3-5 key projects that showcase different skills',
      'Create a content outline for each case study',
      'Define your personal brand and visual style',
      'Plan the portfolio structure and navigation flow'
    ],
    tips: [
      'Focus on process and problem-solving, not just final designs',
      'Include quantitative results where possible',
      'Keep case studies concise but comprehensive',
      'Consider your target audience (recruiters, clients, etc.)'
    ],
    resources: [
      {
        title: 'Portfolio Structure Template',
        url: 'https://www.figma.com/community/file/portfolio-template'
      },
      {
        title: 'Case Study Writing Guide',
        url: 'https://www.uxfolio.com/wiki/case-study-guide'
      }
    ]
  },
  'Case Studies': {
    steps: [
      'Write problem statements for each project',
      'Document your design process and methodologies',
      'Showcase iterations and design evolution',
      'Include user research findings and insights',
      'Present final solutions with clear outcomes'
    ],
    tips: [
      'Use clear before/after comparisons',
      'Include real user feedback and testimonials',
      'Show your role in team projects clearly',
      'Balance visuals with written content'
    ],
    resources: [
      {
        title: 'Case Study Framework',
        url: 'https://www.uxportfolio.com/resources/case-study-framework'
      }
    ]
  }
}; 