export interface TaskInstruction {
  steps: string[];
  tips: string[];
  resources?: {
    title: string;
    url: string;
  }[];
} 