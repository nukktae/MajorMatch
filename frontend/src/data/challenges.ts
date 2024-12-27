import { Challenge } from '../types/challenge';

export const challenges: Challenge[] = [
  // Beginner Computer Science Challenge
  {
    id: 'cs-beginner-1',
    title: 'Personal Portfolio Website',
    description: 'Create a simple portfolio website using HTML, CSS, and basic JavaScript',
    field: 'Computer Science',
    difficulty: 'Beginner',
    points: 100,
    duration: '2 weeks',
    preRequisites: [
      {
        title: 'HTML Crash Course',
        type: 'video',
        url: 'https://www.youtube.com/watch?v=qz0aGYrrlhU',
        duration: '1 hour watch',
        description: 'Learn HTML basics with Traversy Media - perfect for beginners'
      },
      {
        title: 'CSS Fundamentals',
        type: 'video',
        url: 'https://www.youtube.com/watch?v=1PnVor36_40',
        duration: '1.5 hour watch',
        description: 'Master CSS fundamentals with Web Dev Simplified'
      },
      {
        title: 'JavaScript for Beginners',
        type: 'article',
        url: 'https://javascript.info/intro',
        duration: '20 min read',
        description: 'A modern introduction to JavaScript - concepts and basics'
      },
      {
        title: 'Visual Studio Code',
        type: 'tool',
        url: 'https://code.visualstudio.com/',
        description: 'Download and install VS Code - the recommended code editor'
      },
      {
        title: 'Git Basics',
        type: 'book',
        url: 'https://git-scm.com/book/en/v2',
        description: 'Free online book to learn Git version control'
      }
    ],
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
    tasks: [
      {
        id: 1,
        title: 'Data Preparation',
        description: 'Collect and preprocess dataset for training',
        completed: false
      },
      {
        id: 2,
        title: 'Model Development',
        description: 'Design and implement ML algorithms',
        completed: false
      },
      {
        id: 3,
        title: 'Model Training',
        description: 'Train and optimize model performance',
        completed: false
      }
    ],
    resources: [
      { title: 'TensorFlow Documentation', url: 'https://tensorflow.org' },
      { title: 'ML Crash Course', url: 'https://developers.google.com/machine-learning/crash-course' }
    ]
  },
  {
    id: 'ds-1',
    title: 'Data Analysis Project',
    description: 'Analyze a large dataset using Python and create visualizations',
    field: 'Data Science',
    difficulty: 'Intermediate',
    points: 175,
    duration: '2 weeks',
    tasks: [
      {
        id: 1,
        title: 'Data Cleaning',
        description: 'Clean and preprocess the dataset',
        completed: false
      },
      {
        id: 2,
        title: 'Exploratory Analysis',
        description: 'Perform statistical analysis and create visualizations',
        completed: false
      },
      {
        id: 3,
        title: 'Machine Learning',
        description: 'Build and train predictive models',
        completed: false
      }
    ],
    resources: [
      { title: 'Python Data Science Handbook', url: 'https://jakevdp.github.io/PythonDataScienceHandbook/' },
      { title: 'Kaggle Tutorials', url: 'https://www.kaggle.com/learn' }
    ]
  },
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
        title: 'Research & Planning',
        description: 'Research design trends and plan portfolio structure',
        completed: false
      },
      {
        id: 2,
        title: 'Case Studies',
        description: 'Document design process and decisions',
        completed: false
      },
      {
        id: 3,
        title: 'Visual Design',
        description: 'Create high-fidelity mockups and prototypes',
        completed: false
      }
    ],
    resources: [
      { title: 'Figma Tutorials', url: 'https://www.figma.com/resources/learn-design/' },
      { title: 'Design Principles', url: 'https://principles.design' }
    ]
  },
  {
    id: 'business-1',
    title: 'Startup Business Plan',
    description: 'Develop a comprehensive business plan for a startup idea',
    field: 'Business',
    difficulty: 'Advanced',
    points: 250,
    duration: '4 weeks',
    tasks: [
      {
        id: 1,
        title: 'Market Research',
        description: 'Conduct market analysis and identify target audience',
        completed: false
      },
      {
        id: 2,
        title: 'Financial Planning',
        description: 'Create financial projections and funding requirements',
        completed: false
      },
      {
        id: 3,
        title: 'Business Strategy',
        description: 'Define business model and go-to-market strategy',
        completed: false
      }
    ],
    resources: [
      { title: 'Business Model Canvas', url: 'https://www.strategyzer.com/canvas' },
      { title: 'Financial Modeling Guide', url: 'https://www.wallstreetprep.com' }
    ]
  },
  {
    id: 'business-2',
    title: 'Financial Analysis Project',
    description: 'Conduct financial analysis and valuation of a public company',
    field: 'Business',
    difficulty: 'Intermediate',
    points: 200,
    duration: '2 weeks',
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
      { title: 'Financial Modeling Guide', url: 'https://www.wallstreetprep.com' },
      { title: 'Company Financial Reports', url: 'https://www.sec.gov/edgar' }
    ]
  },
  {
    id: 'psych-1',
    title: 'Behavioral Research Study',
    description: 'Design and conduct a psychological research experiment',
    field: 'Psychology',
    difficulty: 'Advanced',
    points: 275,
    duration: '4 weeks',
    tasks: [
      {
        id: 1,
        title: 'Research Design',
        description: 'Develop research methodology and hypothesis',
        completed: false
      },
      {
        id: 2,
        title: 'Data Collection',
        description: 'Conduct experiments and collect data',
        completed: false
      },
      {
        id: 3,
        title: 'Statistical Analysis',
        description: 'Analyze results using statistical methods',
        completed: false
      }
    ],
    resources: [
      { title: 'Research Methods Guide', url: 'https://www.apa.org/education/research/methods' },
      { title: 'Statistical Analysis Tools', url: 'https://www.jamovi.org' }
    ]
  },
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
      }
    ],
    resources: [
      { title: 'Arduino Documentation', url: 'https://www.arduino.cc/reference' },
      { title: 'Robotics Fundamentals', url: 'https://robotacademy.net.au' }
    ]
  },
  {
    id: 'psych-beginner-1',
    title: 'Introduction to Psychology Research',
    description: 'Learn the basics of psychological research through a simple survey study',
    field: 'Psychology',
    difficulty: 'Beginner',
    points: 100,
    duration: '2 weeks',
    preRequisites: [
      {
        title: 'Research Methods Intro',
        type: 'video',
        url: 'https://www.youtube.com/watch?v=di5vf4jzK5Q',
        duration: '30 min watch',
        description: 'Introduction to psychological research methods'
      },
      {
        title: 'Survey Design Basics',
        type: 'article',
        url: 'https://www.simplypsychology.org/questionnaires.html',
        duration: '15 min read',
        description: 'Learn the fundamentals of creating effective surveys'
      }
    ],
    tasks: [
      {
        id: 1,
        title: 'Survey Design',
        description: 'Create a simple questionnaire about study habits',
        completed: false
      },
      {
        id: 2,
        title: 'Data Collection',
        description: 'Gather responses from at least 10 participants',
        completed: false
      },
      {
        id: 3,
        title: 'Basic Analysis',
        description: 'Analyze survey responses and identify patterns',
        completed: false
      },
      {
        id: 4,
        title: 'Results Summary',
        description: 'Write a brief report of your findings',
        completed: false
      }
    ],
    resources: [
      { 
        title: 'Survey Design Guide', 
        url: 'https://www.simplypsychology.org/questionnaires.html' 
      },
      { 
        title: 'Data Analysis Basics', 
        url: 'https://www.verywellmind.com/psychology-research-methods-study-guide-2795700' 
      },
      {
        title: 'APA Style Guide',
        url: 'https://apastyle.apa.org/style-grammar-guidelines'
      }
    ]
  }
]; 