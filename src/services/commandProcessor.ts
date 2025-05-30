import { OutputItem } from '../types';
import { fetchJoke } from './jokeService';
import { fetchWeather } from './weatherService';
import { getAsciiArt } from '../utils/asciiArt';
import { COMMANDS, PROJECTS, SKILLS } from '../utils/constants';

export const processCommand = async (input: string): Promise<OutputItem[]> => {
  const command = input.trim().toLowerCase();
  
  if (command === '') {
    return [];
  }
  
  // Split command and arguments
  const [cmd, ...args] = command.split(' ');
  
  switch (cmd) {
    case 'help':
      return handleHelp();
    case 'about':
      return handleAbout();
    case 'skills':
      return handleSkills();
    case 'projects':
      return handleProjects();
    case 'contact':
      return handleContact();
    case 'clear':
      return []; // Clear command is now handled in Terminal component
    case 'joke':
      return await handleJoke();
    case 'weather':
      return await handleWeather(args[0]);
    case 'matrix':
      return handleEasterEgg('matrix');
    case 'sudo':
      return handleEasterEgg('sudo');
    default:
      return [{ 
        type: 'error', 
        content: `Command not found: ${cmd}. Type 'help' to see available commands.` 
      }];
  }
};

const handleHelp = (): OutputItem[] => {
  return [
    { type: 'text', content: 'Available commands:' },
    ...COMMANDS.map(cmd => ({ 
      type: 'text', 
      content: `${cmd.name.padEnd(10)} - ${cmd.description}`
    }))
  ];
};

const handleAbout = (): OutputItem[] => {
  const asciiArt = getAsciiArt();
  
  return [
    { type: 'ascii', content: asciiArt },
    { type: 'text', content: 'Hi, I\'m Kewal!' },
    { type: 'text', content: 'I\'m a Designer and Vibe Coder with a passion for creating beautiful and functional web experiences.' },
    { type: 'text', content: 'I specialize in UI/UX design and frontend development, bringing the best of both worlds to my projects.' },
    { type: 'text', content: '' },
    { type: 'text', content: 'This interactive terminal portfolio showcases my skills and projects in a unique way.' },
    { type: 'text', content: 'Feel free to explore using the available commands!' }
  ];
};

const handleSkills = (): OutputItem[] => {
  return [
    { type: 'text', content: '=== Technical Skills ===' },
    ...SKILLS.design.map(skill => ({ type: 'text', content: `• Design: ${skill}` })),
    ...SKILLS.development.map(skill => ({ type: 'text', content: `• Development: ${skill}` })),
    ...SKILLS.other.map(skill => ({ type: 'text', content: `• Other: ${skill}` }))
  ];
};

const handleProjects = (): OutputItem[] => {
  const output: OutputItem[] = [
    { type: 'text', content: '=== Projects ===' },
  ];
  
  PROJECTS.forEach(project => {
    output.push({ type: 'text', content: `${project.name} - ${project.description}` });
    output.push({ type: 'link', content: `→ ${project.url}`, url: project.url });
    output.push({ type: 'text', content: `Technologies: ${project.tech.join(', ')}` });
    output.push({ type: 'text', content: '' });
  });
  
  return output;
};

const handleContact = (): OutputItem[] => {
  return [
    { type: 'text', content: '=== Contact Information ===' },
    { type: 'text', content: 'Email: kewaldahal34@gmail.com' },
    { type: 'link', content: 'GitHub: github.com/kewal', url: 'https://github.com/kewaldahal' },
    { type: 'link', content: 'LinkedIn: linkedin.com/in/kewal', url: 'https://linkedin.com/in/kewaldahal' },
    { type: 'link', content: 'Twitter: twitter.com/kewal', url: 'https://x.com/ProfDhlX' },
    { type: 'text', content: '' },
    { type: 'text', content: 'Feel free to reach out for collaborations or questions!' }
  ];
};

const handleJoke = async (): Promise<OutputItem[]> => {
  try {
    const joke = await fetchJoke();
    return [{ type: 'text', content: joke }];
  } catch (error) {
    return [{ 
      type: 'error', 
      content: 'Failed to fetch joke. Please try again later.' 
    }];
  }
};

const handleWeather = async (location = 'New York'): Promise<OutputItem[]> => {
  try {
    const weather = await fetchWeather(location);
    return [{ 
      type: 'weather', 
      content: `Weather in ${weather.location}: ${weather.condition}, ${weather.temperature}°C` 
    }];
  } catch (error) {
    return [{ 
      type: 'error',
      content: 'Failed to fetch weather data. Please try again later.' 
    }];
  }
};

const handleEasterEgg = (type: string): OutputItem[] => {
  switch (type) {
    case 'matrix':
      return [{ 
        type: 'text', 
        content: 'Wake up, Neo... The Matrix has you...' 
      }];
    case 'sudo':
      return [{ 
        type: 'error', 
        content: 'This incident will be reported.' 
      }];
    default:
      return [{ type: 'text', content: 'Easter egg activated!' }];
  }
};