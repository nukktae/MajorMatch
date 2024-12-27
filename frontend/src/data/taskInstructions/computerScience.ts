import { TaskInstruction } from '../../types/taskInstruction';

export const computerScienceInstructions: Record<string, TaskInstruction> = {
  'HTML Structure': {
    steps: [
      'Set up your development environment (VS Code recommended)',
      'Create index.html with proper HTML5 structure',
      'Add navigation menu with Home, About, Projects, and Contact sections',
      'Create content sections with placeholder text and images',
      'Add footer with social media links',
      'Ensure proper semantic HTML usage (header, nav, main, section, footer)'
    ],
    tips: [
      'Use semantic HTML elements for better accessibility',
      'Keep your code clean and well-indented',
      'Add comments to explain structure',
      'Validate your HTML using W3C validator',
      'Plan your content structure before coding'
    ],
    resources: [
      {
        title: 'HTML5 Guide',
        url: 'https://www.w3schools.com/html/'
      },
      {
        title: 'Semantic HTML',
        url: 'https://www.freecodecamp.org/news/semantic-html5-elements/'
      }
    ]
  },
  'Styling': {
    steps: [
      'Create styles.css and link it to your HTML',
      'Style the navigation menu and make it responsive',
      'Add a color scheme and typography',
      'Create a responsive grid layout for projects',
      'Add hover effects and transitions',
      'Implement mobile-first responsive design'
    ],
    tips: [
      'Use CSS variables for consistent colors and spacing',
      'Test on different screen sizes',
      'Keep your CSS organized with comments',
      'Use flexbox/grid for layouts',
      'Consider accessibility in color choices'
    ],
    resources: [
      {
        title: 'CSS Flexbox Guide',
        url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/'
      }
    ]
  },
  'Interactivity': {
    steps: [
      'Create script.js and link it to your HTML',
      'Add smooth scrolling to navigation links',
      'Implement a simple dark/light theme toggle',
      'Add form validation for contact form',
      'Create simple animations for project cards',
      'Implement a mobile menu toggle'
    ],
    tips: [
      'Start with vanilla JavaScript',
      'Use console.log for debugging',
      'Keep functions small and focused',
      'Add error handling for forms',
      'Test all interactive elements'
    ],
    resources: [
      {
        title: 'JavaScript Fundamentals',
        url: 'https://javascript.info/'
      }
    ]
  },
  'Deployment': {
    steps: [
      'Create a GitHub account if needed',
      'Initialize a Git repository',
      'Create a new GitHub repository',
      'Push your code to GitHub',
      'Configure GitHub Pages in repository settings',
      'Test the deployed website'
    ],
    tips: [
      'Use clear commit messages',
      'Test site before deploying',
      'Ensure all links work on deployed site',
      'Add README.md file',
      'Keep repository organized'
    ],
    resources: [
      {
        title: 'GitHub Pages Tutorial',
        url: 'https://pages.github.com/'
      }
    ]
  }
}; 