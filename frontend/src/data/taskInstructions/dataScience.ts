import { TaskInstruction } from '../../types/taskInstruction';

export const dataScienceInstructions: Record<string, TaskInstruction> = {
  'Data Preparation': {
    steps: [
      'Set up development environment with Python, Jupyter, and required libraries',
      'Load and inspect raw data from various sources',
      'Handle missing values and outliers',
      'Perform feature scaling and normalization',
      'Create data preprocessing pipeline',
      'Split data into training, validation, and test sets'
    ],
    tips: [
      'Document all preprocessing steps',
      'Check data distributions before and after transformations',
      'Use version control for your datasets',
      'Implement data validation checks',
      'Consider memory efficiency for large datasets'
    ],
    resources: [
      {
        title: 'Pandas Data Cleaning Guide',
        url: 'https://pandas.pydata.org/docs/user_guide/missing_data.html'
      },
      {
        title: 'Scikit-learn Preprocessing',
        url: 'https://scikit-learn.org/stable/modules/preprocessing.html'
      }
    ]
  },
  'Exploratory Analysis': {
    steps: [
      'Calculate basic statistical measures',
      'Create visualizations for key variables',
      'Analyze correlations between features',
      'Identify patterns and trends in data',
      'Generate hypothesis for further investigation',
      'Document insights and findings'
    ],
    tips: [
      'Use multiple visualization types',
      'Look for unexpected patterns',
      'Consider domain knowledge',
      'Keep track of questions and insights'
    ],
    resources: [
      {
        title: 'Seaborn Tutorial',
        url: 'https://seaborn.pydata.org/tutorial.html'
      },
      {
        title: 'EDA Best Practices',
        url: 'https://www.kaggle.com/learn/data-visualization'
      }
    ]
  },
  'Model Development': {
    steps: [
      'Select appropriate algorithms based on problem type',
      'Implement baseline models',
      'Perform feature engineering',
      'Tune hyperparameters using cross-validation',
      'Evaluate model performance metrics',
      'Implement model validation techniques'
    ],
    tips: [
      'Start with simple models',
      'Use pipeline for reproducibility',
      'Document model architecture decisions',
      'Track experiments systematically'
    ],
    resources: [
      {
        title: 'Scikit-learn Models Guide',
        url: 'https://scikit-learn.org/stable/supervised_learning.html'
      },
      {
        title: 'MLflow Documentation',
        url: 'https://www.mlflow.org/docs/latest/index.html'
      }
    ]
  },
  'Model Evaluation': {
    steps: [
      'Calculate relevant performance metrics',
      'Perform cross-validation',
      'Create confusion matrix and ROC curves',
      'Analyze feature importance',
      'Test model on holdout set',
      'Document model limitations and assumptions'
    ],
    tips: [
      'Consider multiple metrics',
      'Test for bias and fairness',
      'Validate against business metrics',
      'Prepare visualization of results'
    ],
    resources: [
      {
        title: 'Model Evaluation Guide',
        url: 'https://machinelearningmastery.com/metrics-evaluate-machine-learning-algorithms-python'
      }
    ]
  },
  'Feature Engineering': {
    steps: [
      'Identify potential feature transformations',
      'Create interaction features',
      'Handle categorical variables',
      'Implement feature selection methods',
      'Validate feature importance',
      'Document feature engineering decisions'
    ],
    tips: [
      'Consider domain knowledge',
      'Test feature impact on model',
      'Keep track of transformations',
      'Balance complexity vs benefit'
    ],
    resources: [
      {
        title: 'Feature Engineering Book',
        url: 'https://www.featureengineering.com'
      }
    ]
  }
}; 