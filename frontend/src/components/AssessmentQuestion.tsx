export interface Question {
  id: number;
  text: string;
  category: string;
  options: {
    text: string;
    value: string;
  }[];
  required: boolean;
}

export const ASSESSMENT_QUESTIONS: Question[] = [
  {
    id: 1,
    category: "Learning Style",
    text: "How do you prefer to learn and understand new concepts?",
    options: [
      { text: "Through hands-on experiments and practical applications", value: "practical" },
      { text: "By analyzing theoretical concepts and abstract ideas", value: "theoretical" },
      { text: "Through visual representations and diagrams", value: "visual" },
      { text: "By discussing and explaining concepts to others", value: "verbal" }
    ],
    required: true
  },
  {
    id: 2,
    category: "Problem Solving",
    text: "When faced with a complex problem, what's your typical approach?",
    options: [
      { text: "Break it down into smaller, manageable parts", value: "analytical" },
      { text: "Look for creative, innovative solutions", value: "creative" },
      { text: "Research existing solutions and adapt them", value: "methodical" },
      { text: "Collaborate with others to find solutions", value: "collaborative" }
    ],
    required: true
  },
  {
    id: 3,
    category: "Work Environment",
    text: "What type of work environment helps you perform your best?",
    options: [
      { text: "Structured and organized with clear guidelines", value: "structured" },
      { text: "Dynamic and flexible with changing challenges", value: "dynamic" },
      { text: "Collaborative with frequent team interaction", value: "collaborative" },
      { text: "Independent with focus on individual work", value: "independent" }
    ],
    required: true
  },
  {
    id: 4,
    category: "Technology Interest",
    text: "Which aspect of technology interests you the most?",
    options: [
      { text: "AI and Machine Learning applications", value: "ai_ml" },
      { text: "Sustainable and environmental solutions", value: "sustainability" },
      { text: "Digital media and creative tools", value: "digital_media" },
      { text: "Healthcare and biotech innovations", value: "biotech" }
    ],
    required: true
  },
  {
    id: 5,
    category: "Impact Goals",
    text: "What type of impact do you want your work to have?",
    options: [
      { text: "Advancing scientific knowledge", value: "scientific" },
      { text: "Solving societal challenges", value: "social" },
      { text: "Creating innovative products", value: "innovation" },
      { text: "Helping individuals directly", value: "helping" }
    ],
    required: true
  },
  {
    id: 6,
    category: "Decision Making",
    text: "How do you prefer to make important decisions?",
    options: [
      { text: "Using data and logical analysis", value: "analytical" },
      { text: "Following intuition and experience", value: "intuitive" },
      { text: "Considering multiple perspectives", value: "collaborative" },
      { text: "Following established frameworks", value: "structured" }
    ],
    required: true
  },
  {
    id: 7,
    category: "Project Preference",
    text: "What kinds of projects excite you the most?",
    options: [
      { text: "Research and discovery projects", value: "research" },
      { text: "Creative design and development", value: "creative" },
      { text: "Problem-solving challenges", value: "problem_solving" },
      { text: "People-focused initiatives", value: "people" }
    ],
    required: true
  },
  {
    id: 8,
    category: "Communication Style",
    text: "How do you prefer to communicate ideas?",
    options: [
      { text: "Through detailed written explanations", value: "written" },
      { text: "Using visual presentations", value: "visual" },
      { text: "In face-to-face discussions", value: "verbal" },
      { text: "Through practical demonstrations", value: "practical" }
    ],
    required: true
  },
  {
    id: 9,
    category: "Team Role",
    text: "What role do you naturally take in team settings?",
    options: [
      { text: "Leading and coordinating the team", value: "leader" },
      { text: "Contributing specialized expertise", value: "specialist" },
      { text: "Facilitating team harmony", value: "facilitator" },
      { text: "Analyzing and solving problems", value: "analyst" }
    ],
    required: true
  },
  {
    id: 10,
    category: "Growth Areas",
    text: "Which skills would you most like to develop?",
    options: [
      { text: "Technical and analytical abilities", value: "technical" },
      { text: "Creative and innovative thinking", value: "creative" },
      { text: "Leadership and management", value: "leadership" },
      { text: "Communication and collaboration", value: "communication" }
    ],
    required: true
  },
  {
    id: 11,
    category: "Academic Interest",
    text: "Which academic subjects naturally interest you the most?",
    options: [
      { text: "Mathematics and quantitative analysis", value: "math" },
      { text: "Scientific research and experimentation", value: "science" },
      { text: "Arts and creative expression", value: "arts" },
      { text: "Social studies and human behavior", value: "social" }
    ],
    required: true
  },
  {
    id: 12,
    category: "Work-Life Balance",
    text: "What type of work-life balance do you envision?",
    options: [
      { text: "Regular hours with clear boundaries", value: "structured" },
      { text: "Flexible schedule with remote options", value: "flexible" },
      { text: "Project-based with intense periods", value: "project" },
      { text: "Entrepreneurial with self-managed time", value: "entrepreneurial" }
    ],
    required: true
  },
  {
    id: 13,
    category: "Future Goals",
    text: "Where do you see yourself in 10 years?",
    options: [
      { text: "Leading a team or organization", value: "leadership" },
      { text: "Making groundbreaking discoveries", value: "innovation" },
      { text: "Building my own business", value: "entrepreneurship" },
      { text: "Becoming a recognized expert", value: "expertise" }
    ],
    required: true
  },
  {
    id: 14,
    category: "Stress Management",
    text: "How do you prefer to handle stress and challenges?",
    options: [
      { text: "Through systematic planning and organization", value: "systematic" },
      { text: "By seeking support and collaboration", value: "collaborative" },
      { text: "Through creative problem-solving", value: "creative" },
      { text: "By maintaining calm and adapting", value: "adaptive" }
    ],
    required: true
  },
  {
    id: 15,
    category: "Social Impact",
    text: "What type of social impact matters most to you?",
    options: [
      { text: "Environmental sustainability", value: "environmental" },
      { text: "Healthcare and wellbeing", value: "health" },
      { text: "Education and knowledge sharing", value: "education" },
      { text: "Economic development", value: "economic" }
    ],
    required: true
  },
  {
    id: 16,
    category: "Technology Comfort",
    text: "How comfortable are you with learning new technologies?",
    options: [
      { text: "Very comfortable, I enjoy learning new tech", value: "tech_savvy" },
      { text: "Comfortable with basic technology", value: "tech_basic" },
      { text: "Prefer minimal technology use", value: "tech_minimal" },
      { text: "Interested in creating new technology", value: "tech_creator" }
    ],
    required: true
  },
  {
    id: 17,
    category: "Research Interest",
    text: "What aspect of research interests you most?",
    options: [
      { text: "Data analysis and interpretation", value: "data_analysis" },
      { text: "Experimental design and testing", value: "experimental" },
      { text: "Literature review and synthesis", value: "literature" },
      { text: "Field research and observation", value: "field_research" }
    ],
    required: true
  },
  {
    id: 18,
    category: "Cultural Interest",
    text: "How important is cultural diversity in your work?",
    options: [
      { text: "Essential to my work and interests", value: "cultural_focus" },
      { text: "Important but not primary focus", value: "cultural_aware" },
      { text: "Interested in global perspectives", value: "global" },
      { text: "Focused on local community", value: "local" }
    ],
    required: true
  },
  {
    id: 19,
    category: "Financial Goals",
    text: "What are your financial career goals?",
    options: [
      { text: "High earning potential is priority", value: "high_earning" },
      { text: "Balance between pay and passion", value: "balanced" },
      { text: "Stability and steady growth", value: "stable" },
      { text: "Impact over income", value: "impact" }
    ],
    required: true
  },
  {
    id: 20,
    category: "Work Location",
    text: "What's your preferred work location setup?",
    options: [
      { text: "Traditional office environment", value: "office" },
      { text: "Remote work with flexibility", value: "remote" },
      { text: "Field work or traveling", value: "field" },
      { text: "Mixed environment", value: "hybrid" }
    ],
    required: true
  }
]; 