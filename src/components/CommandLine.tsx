import React, { useState, useRef, useEffect } from 'react';
import Cursor from './Cursor';

interface CommandLineProps {
  onSubmit: (command: string) => void;
  onKeyNavigation: (key: string, currentInput: string, setInputCallback: (value: string) => void) => void;
}

const CommandLine: React.FC<CommandLineProps> = ({ onSubmit, onKeyNavigation }) => {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  
  // Auto focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(input);
    setInput('');
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      onKeyNavigation(e.key, input, setInput);
    }
  };
  
  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div 
      className="flex items-center text-green-400"
      onClick={handleContainerClick}
    >
      <span className="mr-2">$</span>
      <form onSubmit={handleSubmit} className="flex-1 flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-1 bg-transparent outline-none text-green-400 font-mono"
          autoComplete="off"
          spellCheck="false"
        />
        {isFocused && <Cursor />}
      </form>
    </div>
  );
};

export default CommandLine;