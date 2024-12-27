import { Challenge } from '../../types/challenge';

export const designChallenges: Challenge[] = [
  {
    id: 'design-1',
    title: 'UX/UI Design Portfolio',
    description: 'Create a comprehensive design portfolio with multiple case studies',
    field: 'Design',
    difficulty: 'Intermediate',
    points: 150,
    duration: '3 weeks',
    tasks: [
      {
        id: 1,
        title: 'Portfolio Strategy',
        description: 'Define portfolio structure and case study selection',
        completed: false
      },
      {
        id: 2,
        title: 'Case Studies',
        description: 'Document design process and decisions for each project',
        completed: false
      },
      {
        id: 3,
        title: 'Visual Design',
        description: 'Create high-fidelity mockups and prototypes',
        completed: false
      },
      {
        id: 4,
        title: 'Portfolio Website',
        description: 'Build and deploy portfolio website',
        completed: false
      }
    ],
    resources: [
      { title: 'UX Portfolio Guide', url: 'https://www.uxfolio.com/guide' },
      { title: 'Figma Tutorials', url: 'https://www.figma.com/resources/learn-design' },
      { title: 'Design Principles', url: 'https://principles.design' }
    ]
  },
  {
    id: 'design-2',
    title: 'Mobile App Design Project',
    description: 'Design a complete mobile application from concept to prototype',
    field: 'Design',
    difficulty: 'Advanced',
    points: 200,
    duration: '4 weeks',
    tasks: [
      {
        id: 1,
        title: 'User Research',
        description: 'Conduct user interviews and create personas',
        completed: false
      },
      {
        id: 2,
        title: 'Information Architecture',
        description: 'Create user flows and site maps',
        completed: false
      },
      {
        id: 3,
        title: 'UI Design',
        description: 'Design UI components and design system',
        completed: false
      },
      {
        id: 4,
        title: 'Prototyping',
        description: 'Create interactive prototype and conduct user testing',
        completed: false
      }
    ],
    resources: [
      { title: 'Mobile Design Guidelines', url: 'https://material.io/design' },
      { title: 'Prototyping in Figma', url: 'https://www.figma.com/prototyping' },
      { title: 'User Testing Guide', url: 'https://www.nngroup.com/articles/usability-testing-101' }
    ]
  }
]; 