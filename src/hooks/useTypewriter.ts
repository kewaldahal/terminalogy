import { useState, useEffect } from 'react';

export const useTypewriter = (text: string, speed = 15) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    setDisplayText('');
    
    if (!text) return;
    
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    
    return () => clearInterval(timer);
  }, [text, speed]);
  
  return displayText;
};