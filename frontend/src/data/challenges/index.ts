import { computerScienceChallenges } from './computerScience';
import { businessChallenges } from './business';
import { psychologyChallenges } from './psychology';
import { engineeringChallenges } from './engineering';
import { designChallenges } from './design';
import { dataScienceChallenges } from './dataScience';

// Make sure the beginner challenge appears first in Computer Science section
export const challenges = [
  // Computer Science challenges (beginner first)
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
  },
  ...computerScienceChallenges,
  ...businessChallenges,
  ...psychologyChallenges,
  ...engineeringChallenges,
  ...designChallenges,
  ...dataScienceChallenges
]; 