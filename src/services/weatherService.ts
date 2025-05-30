import axios from 'axios';

interface WeatherResponse {
  location: string;
  temperature: number;
  condition: string;
}

export const fetchWeather = async (location: string): Promise<WeatherResponse> => {
  try {
    // Note: In a real application, you would use a proper API key
    // For demo purposes, we're mocking the response
    // const API_KEY = 'your_openweathermap_api_key';
    // const response = await axios.get(
    //   `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
    // );
    
    // Simulate API response
    const conditions = ['Sunny', 'Cloudy', 'Rainy', 'Snowy', 'Partly Cloudy'];
    const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
    const randomTemp = Math.floor(Math.random() * 30) + 5; // Random temp between 5 and 35
    
    // Mock response for demo
    return {
      location: location || 'New York',
      temperature: randomTemp,
      condition: randomCondition
    };
    
    // With real API, you would parse the response:
    // return {
    //   location: response.data.name,
    //   temperature: response.data.main.temp,
    //   condition: response.data.weather[0].main
    // };
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw new Error('Failed to fetch weather data');
  }
};