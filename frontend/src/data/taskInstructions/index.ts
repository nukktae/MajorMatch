import { computerScienceInstructions } from './computerScience';
import { businessInstructions } from './business';
import { psychologyInstructions } from './psychology';
import { engineeringInstructions } from './engineering';
import { designInstructions } from './design';
import { dataScienceInstructions } from './dataScience';

export const taskInstructions = {
  ...computerScienceInstructions,
  ...businessInstructions,
  ...psychologyInstructions,
  ...engineeringInstructions,
  ...designInstructions,
  ...dataScienceInstructions
}; 