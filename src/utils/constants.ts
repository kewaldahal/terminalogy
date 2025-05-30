import { Command, Project } from '../types';

export const COMMANDS: Command[] = [
  { name: 'help', description: 'Show available commands' },
  { name: 'about', description: 'Display information about me' },
  { name: 'skills', description: 'List my technical skills' },
  { name: 'projects', description: 'Show my portfolio projects' },
  { name: 'contact', description: 'Display contact information' },
  { name: 'clear', description: 'Clear the terminal screen' },
  { name: 'joke', description: 'Get a random joke' },
  { name: 'weather', description: 'Check the weather (usage: weather [location])' },
];

export const SKILLS = {
  design: [
    'Adobe Photoshop',
    'UI/UX Design',
    'Wireframing',
    'Prototyping',
    'Responsive Design'
  ],
  development: [
    'React.js',
    'JavaScript/TypeScript',
    'HTML/CSS',
    'Tailwind CSS',
    'C++'
  ],
  other: [
    'Project Management',
    'Team Collaboration',
    'Problem Solving',
    'Creative Thinking'
  ]
};

export const PROJECTS: Project[] = [
  {
    name: 'Portfolio Website',
    description: 'Interactive terminal-based portfolio website',
    url: 'https://kewaldahal.com.np',
    tech: ['React', 'TypeScript', 'Tailwind CSS']
  },
  // {
  //   name: 'E-commerce Dashboard',
  //   description: 'Admin dashboard for managing products and orders',
  //   url: 'https://example.com/dashboard',
  //   tech: ['React', 'Redux', 'Node.js']
  // },
  // {
  //   name: 'Weather App',
  //   description: 'Real-time weather application with forecast',
  //   url: 'https://example.com/weather',
  //   tech: ['JavaScript', 'Weather API', 'CSS']
  // },
  // {
  //   name: 'Task Management System',
  //   description: 'Collaborative task tracking application',
  //   url: 'https://example.com/tasks',
  //   tech: ['React', 'Firebase', 'Material UI']
  // }
];