import { Challenge } from '../../types/challenge';

export const dataScienceChallenges: Challenge[] = [
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
        description: 'Clean and preprocess the dataset for analysis',
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
        title: 'Insights Generation',
        description: 'Extract meaningful insights from the data',
        completed: false
      },
      {
        id: 4,
        title: 'Final Report',
        description: 'Create a comprehensive report with findings',
        completed: false
      }
    ],
    resources: [
      { title: 'Python Data Science Handbook', url: 'https://jakevdp.github.io/PythonDataScienceHandbook' },
      { title: 'Pandas Documentation', url: 'https://pandas.pydata.org/docs' },
      { title: 'Seaborn Tutorial', url: 'https://seaborn.pydata.org/tutorial.html' }
    ]
  },
  {
    id: 'ds-2',
    title: 'Predictive Modeling Challenge',
    description: 'Build a machine learning model to predict outcomes from real-world data',
    field: 'Data Science',
    difficulty: 'Advanced',
    points: 250,
    duration: '3 weeks',
    tasks: [
      {
        id: 1,
        title: 'Data Preparation',
        description: 'Prepare and split data for training and testing',
        completed: false
      },
      {
        id: 2,
        title: 'Feature Engineering',
        description: 'Create and select relevant features for the model',
        completed: false
      },
      {
        id: 3,
        title: 'Model Development',
        description: 'Train and tune machine learning models',
        completed: false
      },
      {
        id: 4,
        title: 'Model Evaluation',
        description: 'Evaluate model performance and create predictions',
        completed: false
      }
    ],
    resources: [
      { title: 'Scikit-learn Documentation', url: 'https://scikit-learn.org/stable' },
      { title: 'Machine Learning Guide', url: 'https://developers.google.com/machine-learning/crash-course' },
      { title: 'Feature Engineering Tips', url: 'https://www.kaggle.com/learn/feature-engineering' }
    ]
  }
]; 