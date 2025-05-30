import { useState } from 'react';

export const useCommandHistory = (maxSize = 50) => {
  const [history, setHistory] = useState<string[]>([]);
  const [index, setIndex] = useState(-1);
  
  const addCommand = (command: string) => {
    if (command.trim() === '') return;
    
    setHistory((prev) => {
      // Remove duplicates and add to front
      const newHistory = [command, ...prev.filter(cmd => cmd !== command)];
      // Limit size
      return newHistory.slice(0, maxSize);
    });
    setIndex(-1);
  };
  
  const getPreviousCommand = () => {
    if (history.length === 0) return '';
    
    const newIndex = Math.min(index + 1, history.length - 1);
    setIndex(newIndex);
    return history[newIndex];
  };
  
  const getNextCommand = () => {
    if (index <= 0) {
      setIndex(-1);
      return '';
    }
    
    const newIndex = index - 1;
    setIndex(newIndex);
    return history[newIndex];
  };
  
  return {
    addCommand,
    getPreviousCommand,
    getNextCommand,
    history,
  };
};