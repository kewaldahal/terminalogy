import React, { useEffect, useRef, useState } from 'react';
import CommandLine from './CommandLine';
import CommandHistory from './CommandHistory';
import { processCommand } from '../services/commandProcessor';
import { HistoryItem } from '../types';

const Terminal: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Add welcome message on first load
  useEffect(() => {
    const welcomeMessage: HistoryItem = {
      id: Date.now(),
      command: '',
      output: [
        { type: 'text', content: 'Welcome to Kewal\'s Terminal Portfolio!' },
        { type: 'text', content: 'Type "help" to see available commands.' },
      ],
    };
    setHistory([welcomeMessage]);
  }, []);

  // Auto scroll to bottom when history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = async (command: string) => {
    // Handle clear command directly
    if (command.trim().toLowerCase() === 'clear') {
      setHistory([]);
      return;
    }

    // Add command to history
    if (command.trim()) {
      setCommandHistory((prev) => [command, ...prev]);
      setHistoryIndex(-1);
    }

    // Process command
    const result = await processCommand(command);
    
    // Add to display history
    setHistory((prev) => [
      ...prev,
      {
        id: Date.now(),
        command,
        output: result,
      },
    ]);
  };

  const handleKeyNavigation = (key: string, currentInput: string, setInputCallback: (value: string) => void) => {
    if (key === 'ArrowUp') {
      const nextIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
      if (nextIndex >= 0 && commandHistory[nextIndex]) {
        setHistoryIndex(nextIndex);
        setInputCallback(commandHistory[nextIndex]);
      }
    } else if (key === 'ArrowDown') {
      const nextIndex = Math.max(historyIndex - 1, -1);
      setHistoryIndex(nextIndex);
      if (nextIndex === -1) {
        setInputCallback('');
      } else if (commandHistory[nextIndex]) {
        setInputCallback(commandHistory[nextIndex]);
      }
    }
  };

  return (
    <div className="w-full max-w-4xl h-[80vh] bg-gray-900 rounded-md shadow-xl border border-green-500/30 flex flex-col overflow-hidden">
      <div className="bg-gray-800 px-4 py-2 border-b border-green-500/30 flex items-center">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="mx-auto text-green-400 font-mono text-sm">
          kewal@terminal-portfolio ~ 
        </div>
      </div>
      
      <div 
        ref={terminalRef}
        className="flex-1 bg-gray-900 text-green-400 font-mono p-4 overflow-auto"
      >
        <CommandHistory history={history} />
      </div>
      
      <div className="bg-gray-900 border-t border-green-500/30 p-2">
        <CommandLine 
          onSubmit={handleCommand} 
          onKeyNavigation={handleKeyNavigation}
        />
      </div>
    </div>
  );
};

export default Terminal;