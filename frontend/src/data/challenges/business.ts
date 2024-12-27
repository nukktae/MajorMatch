import { Challenge } from '../../types/challenge';

export const businessChallenges: Challenge[] = [
  {
    id: 'business-1',
    title: 'Business Model Canvas',
    description: 'Create a comprehensive business model canvas for a startup idea',
    field: 'Business',
    category: 'Business',
    difficulty: 'Intermediate',
    points: 150,
    duration: '2 weeks',
    estimatedTime: '2-3 hours',
    tasks: [
      {
        id: 1,
        title: 'Market Research',
        description: 'Research target market and competitors',
        completed: false
      },
      {
        id: 2,
        title: 'Value Proposition',
        description: 'Define unique value proposition and customer segments',
        completed: false
      },
      {
        id: 3,
        title: 'Revenue Model',
        description: 'Develop revenue streams and cost structure',
        completed: false
      }
    ],
    resources: [
      { title: 'Business Model Canvas', url: 'https://www.strategyzer.com/canvas' },
      { title: 'Market Research Guide', url: 'https://www.entrepreneur.com/article/217345' }
    ]
  },
  {
    id: 'business-2',
    title: 'Financial Analysis Project',
    description: 'Conduct financial analysis and valuation of a public company',
    field: 'Business',
    category: 'Business',
    difficulty: 'Intermediate',
    points: 200,
    duration: '2 weeks',
    estimatedTime: '4-5 hours',
    tasks: [
      {
        id: 1,
        title: 'Financial Statement Analysis',
        description: 'Analyze income statements, balance sheets, and cash flows',
        completed: false
      },
      {
        id: 2,
        title: 'Ratio Analysis',
        description: 'Calculate and interpret key financial ratios',
        completed: false
      },
      {
        id: 3,
        title: 'Valuation',
        description: 'Perform company valuation using multiple methods',
        completed: false
      }
    ],
    resources: [
      { title: 'Financial Analysis Guide', url: 'https://www.investopedia.com/financial-analysis-guide' },
      { title: 'Valuation Template', url: 'https://www.tableau.com/learn/articles/valuation-template' }
    ]
  }
]; 