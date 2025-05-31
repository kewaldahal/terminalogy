import axios from 'axios';

interface WeatherResponse {
  location: string;
  temperature: number;
  condition: string;
}

export const fetchWeather = async (location: string): Promise<WeatherResponse> => {
  try {
    // First get coordinates for the location
    const geoResponse = await axios.get(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1`
    );

    if (!geoResponse.data.results?.[0]) {
      throw new Error('Location not found');
    }

    const { latitude, longitude, name } = geoResponse.data.results[0];

    // Get weather data using Open-Meteo API
    const weatherResponse = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`
    );

    const currentWeather = weatherResponse.data.current;
    
    return {
      location: name,
      temperature: Math.round(currentWeather.temperature_2m),
      condition: getWeatherCondition(currentWeather.weather_code)
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw new Error('Failed to fetch weather data');
  }
};

// Helper function to convert WMO weather codes to readable text
const getWeatherCondition = (code: number): string => {
  const conditions: { [key: number]: string } = {
    0: 'Clear',
    1: 'Mainly Clear',
    2: 'Partly Cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Freezing Fog',
    51: 'Light Drizzle',
    53: 'Moderate Drizzle',
    55: 'Dense Drizzle',
    56: 'Light Freezing Drizzle',
    57: 'Dense Freezing Drizzle',
    61: 'Light Rain',
    63: 'Moderate Rain',
    65: 'Heavy Rain',
    66: 'Light Freezing Rain',
    67: 'Heavy Freezing Rain',
    71: 'Light Snow',
    73: 'Moderate Snow',
    75: 'Heavy Snow',
    77: 'Snow Grains',
    80: 'Light Rain Showers',
    81: 'Moderate Rain Showers',
    82: 'Violent Rain Showers',
    85: 'Light Snow Showers',
    86: 'Heavy Snow Showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with Light Hail',
    99: 'Thunderstorm with Heavy Hail'
  };

  return conditions[code] || 'Unknown';
};