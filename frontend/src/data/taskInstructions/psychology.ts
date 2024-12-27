import { TaskInstruction } from '../../types/taskInstruction';

export const psychologyInstructions: Record<string, TaskInstruction> = {
  'Literature Review': {
    steps: [
      'Define research question and objectives',
      'Search academic databases (PsycINFO, Google Scholar)',
      'Screen and select relevant papers',
      'Create literature review matrix',
      'Analyze methodologies and findings',
      'Identify research gaps and opportunities',
      'Write comprehensive literature summary'
    ],
    tips: [
      'Use systematic review approach',
      'Track search terms and databases used',
      'Focus on peer-reviewed articles',
      'Consider publication bias',
      'Note conflicting findings'
    ],
    resources: [
      {
        title: 'APA Research Database',
        url: 'https://www.apa.org/pubs/databases/psycinfo'
      },
      {
        title: 'Systematic Review Guide',
        url: 'https://guides.library.cornell.edu/systematic_reviews'
      }
    ]
  },
  'Research Design': {
    steps: [
      'Formulate research hypothesis',
      'Choose appropriate research methodology',
      'Define variables and measures',
      'Determine sample size and characteristics',
      'Design experimental procedures',
      'Create data collection instruments',
      'Plan statistical analyses'
    ],
    tips: [
      'Consider ethical implications',
      'Plan for potential confounding variables',
      'Include control conditions',
      'Pilot test procedures',
      'Document all methodological decisions'
    ],
    resources: [
      {
        title: 'Research Methods Guide',
        url: 'https://www.apa.org/education/research/methods'
      }
    ]
  },
  'IRB Approval': {
    steps: [
      'Complete required ethics training',
      'Prepare informed consent documents',
      'Write detailed protocol description',
      'Address potential risks and benefits',
      'Create participant recruitment materials',
      'Submit IRB application',
      'Respond to reviewer feedback'
    ],
    tips: [
      'Allow sufficient time for review',
      'Be thorough in risk assessment',
      'Include all study materials',
      'Consider vulnerable populations',
      'Plan for data privacy'
    ],
    resources: [
      {
        title: 'IRB Guidelines',
        url: 'https://www.hhs.gov/ohrp/regulations-and-policy'
      }
    ]
  },
  'Data Collection': {
    steps: [
      'Set up experiment environment',
      'Train research assistants',
      'Recruit participants',
      'Implement experimental procedures',
      'Record and organize data',
      'Monitor data quality',
      'Document any deviations from protocol'
    ],
    tips: [
      'Standardize procedures',
      'Keep detailed research logs',
      'Backup data regularly',
      'Monitor participant feedback',
      'Track completion rates'
    ],
    resources: [
      {
        title: 'Data Collection Best Practices',
        url: 'https://www.apa.org/research/responsible/data'
      }
    ]
  },
  'Analysis & Report': {
    steps: [
      'Clean and prepare data',
      'Conduct statistical analyses',
      'Create data visualizations',
      'Interpret results',
      'Write research paper',
      'Prepare tables and figures',
      'Review and revise manuscript'
    ],
    tips: [
      'Follow APA style guidelines',
      'Address study limitations',
      'Include effect sizes',
      'Consider practical implications',
      'Get peer feedback'
    ],
    resources: [
      {
        title: 'APA Style Guide',
        url: 'https://apastyle.apa.org'
      },
      {
        title: 'Statistical Analysis Tools',
        url: 'https://www.jamovi.org'
      }
    ]
  }
}; 