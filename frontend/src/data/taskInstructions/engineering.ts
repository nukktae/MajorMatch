import { TaskInstruction } from '../../types/taskInstruction';

export const engineeringInstructions: Record<string, TaskInstruction> = {
  'Robot Design': {
    steps: [
      'Create detailed mechanical design specifications',
      'Design circuit diagrams for all electronic components',
      'Select appropriate sensors and actuators',
      'Plan power distribution system',
      'Create 3D models of mechanical components',
      'Document assembly instructions'
    ],
    tips: [
      'Consider weight distribution and balance',
      'Plan for easy maintenance access',
      'Use modular design principles',
      'Include safety features',
      'Document all design decisions'
    ],
    resources: [
      {
        title: 'CAD Design Tutorial',
        url: 'https://www.autodesk.com/fusion360-tutorials'
      },
      {
        title: 'Circuit Design Guide',
        url: 'https://www.electronics-tutorials.com'
      }
    ]
  },
  'Hardware Assembly': {
    steps: [
      'Gather all required components and tools',
      'Assemble robot chassis following design specs',
      'Mount motors and actuators',
      'Build and test electronic circuits',
      'Install sensors according to design',
      'Connect power distribution system'
    ],
    tips: [
      'Test components before assembly',
      'Follow proper soldering techniques',
      'Label all wires and connections',
      'Document any deviations from design',
      'Take photos during assembly'
    ],
    resources: [
      {
        title: 'Soldering Guide',
        url: 'https://learn.adafruit.com/adafruit-guide-excellent-soldering'
      }
    ]
  },
  'Programming': {
    steps: [
      'Set up Arduino IDE and required libraries',
      'Implement basic motor control functions',
      'Write sensor reading and calibration code',
      'Develop main control algorithms',
      'Implement error handling and safety features',
      'Create debugging and testing functions'
    ],
    tips: [
      'Use version control for code',
      'Comment code thoroughly',
      'Implement proper error handling',
      'Test each component separately',
      'Create a debugging interface'
    ],
    resources: [
      {
        title: 'Arduino Programming Guide',
        url: 'https://www.arduino.cc/en/Tutorial/HomePage'
      }
    ]
  },
  'Testing & Optimization': {
    steps: [
      'Create comprehensive test plan',
      'Perform individual component testing',
      'Test integrated system functionality',
      'Measure and optimize performance metrics',
      'Document all test results',
      'Make necessary adjustments and improvements'
    ],
    tips: [
      'Start with basic functionality tests',
      'Test edge cases and error conditions',
      'Keep detailed performance logs',
      'Test in different environments',
      'Get feedback from users/testers'
    ],
    resources: [
      {
        title: 'Robot Testing Methods',
        url: 'https://robotacademy.net.au/testing-guide'
      }
    ]
  }
}; 