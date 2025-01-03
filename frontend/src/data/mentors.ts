export const mentors = [
  {
    id: '1',
    name: 'Anu Bilegdemberel',
    email: 'anubile.gdemberel@yahoo.com',
    title: 'Fullstack Engineer',
    field: 'Software Engineering',
    experience: '3 years',
    availability: 'Weekends',
    specialties: [
      'Study Abroad Consulting',
      'Scholarship Applications',
      'International Education',
      'Full Stack Development',
      'Korean Universities',
      'US Universities',
      'Chinese Universities'
    ],
    rating: 4.8,
    imageUrl: '/src/assets/videos/mypic.JPG',
    about: 'A passionate Software Engineering professional dedicated to helping students navigate their academic and career paths.'
  },
  {
    id: '2',
    name: 'Casey Lee',
    email: 'caseylee247@kookmin.ac.kr',
    title: 'UX Designer & Psychology Researcher',
    field: 'Design & Psychology',
    experience: '5 years',
    availability: 'Weekdays & Evenings',
    specialties: [
      'User Experience Design',
      'Cognitive Psychology',
      'Research Methods',
      'Human-Computer Interaction',
      'Design Thinking',
      'User Research',
      'Mental Health Studies'
    ],
    rating: 4.9,
    imageUrl: '/mentors/casey.jpg',
    about: 'Experienced UX Designer and Psychology Researcher helping students bridge the gap between design thinking and human behavior.'
  }
];

export type Mentor = typeof mentors[0]; 