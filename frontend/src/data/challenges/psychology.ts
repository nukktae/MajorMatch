import { Challenge } from '../../types/challenge';

export const psychologyChallenges: Challenge[] = [
  {
    id: 'psych-beginner',
    title: 'Introduction to Psychology Research',
    description: 'Learn the basics of psychological research through a simple survey study',
    field: 'Psychology',
    difficulty: 'Beginner',
    points: 100,
    duration: '2 weeks',
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
      }
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
        title: 'IRB Approval',
        description: 'Prepare and submit ethics review documentation',
        completed: false
      },
      {
        id: 3,
        title: 'Data Collection',
        description: 'Conduct experiments and collect data',
        completed: false
      },
      {
        id: 4,
        title: 'Analysis & Report',
        description: 'Analyze results and write research paper',
        completed: false
      }
    ],
    resources: [
      { title: 'Research Methods Guide', url: 'https://www.apa.org/education/research/methods' },
      { title: 'Statistical Analysis Tools', url: 'https://www.jamovi.org' },
      { title: 'APA Style Guide', url: 'https://apastyle.apa.org' }
    ]
  },
  {
    id: 'psych-2',
    title: 'Cognitive Psychology Project',
    description: 'Investigate memory, attention, or decision-making processes',
    field: 'Psychology',
    difficulty: 'Intermediate',
    points: 200,
    duration: '3 weeks',
    tasks: [
      {
        id: 1,
        title: 'Literature Review',
        description: 'Review existing research on your chosen topic',
        completed: false
      },
      {
        id: 2,
        title: 'Experiment Design',
        description: 'Create experimental protocol and materials',
        completed: false
      },
      {
        id: 3,
        title: 'Data Collection',
        description: 'Run experiments with participants',
        completed: false
      }
    ],
    resources: [
      { title: 'Cognitive Psychology Basics', url: 'https://www.simplypsychology.org/cognitive.html' },
      { title: 'Experimental Design Guide', url: 'https://www.verywellmind.com/experimental-design-how-to-conduct-experiments-2795081' }
    ]
  },
  {
    id: 'psych-3',
    title: 'Introduction to Psychological Observation',
    description: 'Learn basic psychological observation and note-taking techniques',
    field: 'Psychology',
    difficulty: 'Beginner',
    points: 150,
    duration: '2 weeks',
    tasks: [
      {
        id: 1,
        title: 'Basic Concepts',
        description: 'Learn fundamental observation methods and ethical guidelines',
        completed: false
      },
      {
        id: 2,
        title: 'Practice Observation',
        description: 'Conduct a simple observational study in a public setting',
        completed: false
      },
      {
        id: 3,
        title: 'Data Recording',
        description: 'Document observations using standard psychology notation',
        completed: false
      },
      {
        id: 4,
        title: 'Analysis & Reflection',
        description: 'Write a brief report analyzing your observations',
        completed: false
      }
    ],
    resources: [
      { 
        title: 'Observational Research Methods', 
        url: 'https://www.simplypsychology.org/observation.html' 
      },
      { 
        title: 'Note-Taking Guidelines', 
        url: 'https://www.apa.org/education/taking-notes' 
      },
      { 
        title: 'Ethics in Psychology', 
        url: 'https://www.apa.org/ethics/code' 
      }
    ]
  }
]; 

// Add task tips
export const getTaskTips = (taskTitle: string) => {
  const tips: Record<string, string[]> = {
    'Survey Design': [
      'Keep questions clear and concise',
      'Use a mix of question types',
      'Avoid leading questions',
      'Test your survey with a friend first'
    ],
    'Data Collection': [
      'Explain the purpose to participants',
      'Ensure participant privacy',
      'Keep track of response rates',
      'Store data securely'
    ],
    'Basic Analysis': [
      'Look for common themes in responses',
      'Create simple graphs or charts',
      'Calculate basic statistics',
      'Note any surprising findings'
    ],
    'Results Summary': [
      'Structure your report clearly',
      'Include visual representations',
      'Discuss limitations of your study',
      'Suggest future improvements'
    ],
    'Basic Concepts': [
      'Review APA ethical guidelines before starting',
      'Focus on objective observations rather than interpretations',
      'Practice identifying different types of behavioral cues',
      'Keep a dedicated notebook for psychological observations'
    ],
    'Practice Observation': [
      'Choose a public setting like a park or cafe',
      'Maintain participant privacy and anonymity',
      'Set specific time limits for observation sessions',
      'Focus on one type of behavior at a time'
    ],
    'Data Recording': [
      'Use standardized abbreviations for common behaviors',
      'Include timestamps with your observations',
      'Note environmental factors that might influence behavior',
      'Separate observations from interpretations in your notes'
    ],
    'Analysis & Reflection': [
      'Look for patterns in your collected data',
      'Consider potential biases in your observations',
      'Connect observations to psychological concepts',
      'Reflect on what you learned about the observation process'
    ]
  };
  return tips[taskTitle] || [];
};

// Add chat prompts
export const getChatPrompts = (taskTitle: string) => {
  const prompts: Record<string, string[]> = {
    'Survey Design': [
      'What makes a good survey question?',
      'How many questions should I include?',
      'What types of response formats can I use?'
    ],
    'Data Collection': [
      'How do I find participants?',
      'What information should I tell participants?',
      'How can I ensure data quality?'
    ],
    'Basic Analysis': [
      'What are the basic ways to analyze survey data?',
      'How do I identify patterns in responses?',
      'What statistics should I calculate?'
    ],
    'Results Summary': [
      'How should I structure my report?',
      'What are the key points to include?',
      'How do I present my findings clearly?'
    ],
    'Basic Concepts': [
      'What are the key ethical considerations in observational research?',
      'How do you maintain objectivity during observations?',
      'What's the difference between naturalistic and participant observation?'
    ],
    'Practice Observation': [
      'What setting would be best for my observation?',
      'How long should each observation session be?',
      'What behaviors should I focus on?'
    ],
    'Data Recording': [
      'What's the best format for recording observations?',
      'How detailed should my notes be?',
      'What environmental factors should I document?'
    ],
    'Analysis & Reflection': [
      'How do I identify behavioral patterns?',
      'What are common biases in observational research?',
      'How can I improve my observation techniques?'
    ]
  };
  return prompts[taskTitle] || [];
}; 