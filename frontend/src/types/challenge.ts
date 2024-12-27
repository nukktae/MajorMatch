export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export interface PreRequisite {
  title: string;
  type: 'video' | 'article' | 'book' | 'tool';
  url: string;
  duration?: string; // For videos/articles (e.g., "10 min read", "15 min watch")
  description: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  field: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  points: number;
  duration: string;
  estimatedTime: string;
  category: string;
  tasks: {
    id: number;
    title: string;
    description: string;
    completed: boolean;
  }[];
  resources: {
    title: string;
    url: string;
  }[];
  preRequisites?: {
    title: string;
    type: string;
    url: string;
    duration?: string;
    description: string;
  }[];
} 