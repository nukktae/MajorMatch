import { TaskInstruction } from '../../types/taskInstruction';

export const businessInstructions: Record<string, TaskInstruction> = {
  'Market Research': {
    steps: [
      'Define research objectives and key questions',
      'Conduct industry analysis using PESTLE framework',
      'Identify and analyze target market segments',
      'Perform competitor analysis using Porter\'s Five Forces',
      'Create customer personas based on research findings',
      'Analyze market trends and growth opportunities'
    ],
    tips: [
      'Use both primary and secondary research methods',
      'Focus on quantifiable market data',
      'Document all sources and methodologies',
      'Include visual representations of data'
    ],
    resources: [
      {
        title: 'Market Research Templates',
        url: 'https://www.hubspot.com/market-research-kit'
      },
      {
        title: 'Industry Analysis Tools',
        url: 'https://www.ibisworld.com/industry-research'
      }
    ]
  },
  'Financial Planning': {
    steps: [
      'Create detailed financial assumptions',
      'Develop 3-5 year financial projections',
      'Build income statement, balance sheet, and cash flow',
      'Calculate key financial metrics and ratios',
      'Determine funding requirements and sources',
      'Perform break-even and sensitivity analysis'
    ],
    tips: [
      'Be conservative in your projections',
      'Include detailed notes on assumptions',
      'Consider multiple scenarios',
      'Use industry benchmarks for validation'
    ],
    resources: [
      {
        title: 'Financial Modeling Course',
        url: 'https://www.wallstreetprep.com/financial-modeling'
      }
    ]
  },
  'Business Strategy': {
    steps: [
      'Define company vision and mission',
      'Conduct SWOT analysis',
      'Develop value proposition and USP',
      'Create go-to-market strategy',
      'Define revenue model and pricing strategy',
      'Plan organizational structure and resources'
    ],
    tips: [
      'Align strategy with market research findings',
      'Consider competitive advantages',
      'Make strategies measurable and actionable',
      'Include implementation timeline'
    ],
    resources: [
      {
        title: 'Business Model Canvas',
        url: 'https://www.strategyzer.com/canvas'
      }
    ]
  },
  'Market Size Estimation': {
    steps: [
      'Define TAM (Total Addressable Market)',
      'Calculate SAM (Serviceable Addressable Market)',
      'Determine SOM (Serviceable Obtainable Market)',
      'Research market growth rates',
      'Document calculation methodology',
      'Create market size visualization'
    ],
    tips: [
      'Use multiple calculation methods',
      'Validate with industry reports',
      'Consider regional differences',
      'Account for market trends'
    ],
    resources: [
      {
        title: 'Market Sizing Guide',
        url: 'https://www.mckinsey.com/market-sizing'
      }
    ]
  }
}; 