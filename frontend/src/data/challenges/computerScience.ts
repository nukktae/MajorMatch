import { Challenge } from '../../types/challenge';

export const computerScienceChallenges: Challenge[] = [
  {
    id: 'cs-1',
    title: 'Full-Stack Web Application',
    description: 'Build a complete web application with user authentication, database integration, and real-time features',
    field: 'Computer Science',
    difficulty: 'Advanced',
    points: 300,
    duration: '4 weeks',
    tasks: [
      {
        id: 1,
        title: 'Backend API Development',
        description: 'Create RESTful APIs using Node.js and Express',
        completed: false
      },
      {
        id: 2,
        title: 'Database Design',
        description: 'Design and implement database schema using PostgreSQL',
        completed: false
      },
      {
        id: 3,
        title: 'Frontend Development',
        description: 'Build responsive UI using React and TypeScript',
        completed: false
      },
      {
        id: 4,
        title: 'Authentication System',
        description: 'Implement secure user authentication and authorization',
        completed: false
      }
    ],
    resources: [
      { title: 'Node.js Documentation', url: 'https://nodejs.org/docs' },
      { title: 'React Documentation', url: 'https://react.dev' },
      { title: 'PostgreSQL Tutorial', url: 'https://www.postgresql.org/docs/current/tutorial.html' }
    ]
  },
  {
    id: 'cs-2',
    title: 'Machine Learning Project',
    description: 'Build and train a machine learning model to solve a real-world problem',
    field: 'Computer Science',
    difficulty: 'Advanced',
    points: 250,
    duration: '3 weeks',
    tasks: [/* existing tasks */],
    resources: [/* existing resources */]
  },
  {
    id: 'cs-beginner-1',
    title: 'Personal Portfolio Website',
    description: 'Create a simple portfolio website using HTML, CSS, and basic JavaScript',
    field: 'Computer Science',
    difficulty: 'Beginner',
    points: 100,
    duration: '2 weeks',
    tasks: [
      {
        id: 1,
        title: 'HTML Structure',
        description: 'Create the basic HTML structure and content',
        completed: false
      },
      {
        id: 2,
        title: 'Styling',
        description: 'Style the website using CSS and make it responsive',
        completed: false
      },
      {
        id: 3,
        title: 'Interactivity',
        description: 'Add basic JavaScript functionality and animations',
        completed: false
      },
      {
        id: 4,
        title: 'Deployment',
        description: 'Deploy the website to GitHub Pages',
        completed: false
      }
    ],
    resources: [
      { title: 'HTML/CSS Tutorial', url: 'https://www.w3schools.com/html/' },
      { title: 'JavaScript Basics', url: 'https://javascript.info/' },
      { title: 'GitHub Pages Guide', url: 'https://pages.github.com/' }
    ]
  }
]; 