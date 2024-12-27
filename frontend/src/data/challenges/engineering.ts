import { Challenge } from '../../types/challenge';

export const engineeringChallenges: Challenge[] = [
  {
    id: 'eng-1',
    title: 'Robotics Engineering Project',
    description: 'Design and build an autonomous robot using Arduino',
    field: 'Engineering',
    difficulty: 'Advanced',
    points: 300,
    duration: '5 weeks',
    tasks: [
      {
        id: 1,
        title: 'Robot Design',
        description: 'Create mechanical design and circuit diagrams',
        completed: false
      },
      {
        id: 2,
        title: 'Hardware Assembly',
        description: 'Build robot chassis and electronic circuits',
        completed: false
      },
      {
        id: 3,
        title: 'Programming',
        description: 'Implement control algorithms and sensors',
        completed: false
      },
      {
        id: 4,
        title: 'Testing & Optimization',
        description: 'Test robot performance and optimize behavior',
        completed: false
      }
    ],
    resources: [
      { title: 'Arduino Documentation', url: 'https://www.arduino.cc/reference' },
      { title: 'Robotics Fundamentals', url: 'https://robotacademy.net.au' },
      { title: 'Circuit Design Basics', url: 'https://learn.sparkfun.com' }
    ]
  },
  {
    id: 'eng-2',
    title: 'Sustainable Energy Project',
    description: 'Design a renewable energy system for a small community',
    field: 'Engineering',
    difficulty: 'Intermediate',
    points: 250,
    duration: '4 weeks',
    tasks: [
      {
        id: 1,
        title: 'Site Analysis',
        description: 'Analyze location and energy requirements',
        completed: false
      },
      {
        id: 2,
        title: 'System Design',
        description: 'Design renewable energy system components',
        completed: false
      },
      {
        id: 3,
        title: 'Efficiency Calculations',
        description: 'Calculate system efficiency and output',
        completed: false
      }
    ],
    resources: [
      { title: 'Renewable Energy Basics', url: 'https://www.nrel.gov/research' },
      { title: 'Energy Calculation Tools', url: 'https://pvwatts.nrel.gov' }
    ]
  }
]; 