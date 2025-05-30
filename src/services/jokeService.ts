import axios from 'axios';

export const fetchJoke = async (): Promise<string> => {
  try {
    // Using the Official Joke API
    const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
    const { setup, punchline } = response.data;
    return `${setup}\n${punchline}`;
  } catch (error) {
    console.error('Error fetching joke:', error);
    throw new Error('Failed to fetch joke');
  }
};