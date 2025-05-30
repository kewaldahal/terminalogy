import React from 'react';
import { HistoryItem, OutputItem } from '../types';
import { useTypewriter } from '../hooks/useTypewriter';

interface CommandHistoryProps {
  history: HistoryItem[];
}

const CommandHistory: React.FC<CommandHistoryProps> = ({ history }) => {
  return (
    <div className="space-y-4">
      {history.map((item) => (
        <div key={item.id} className="space-y-1">
          {item.command && (
            <div className="flex">
              <span className="text-green-400 mr-2">$</span>
              <span className="text-green-400">{item.command}</span>
            </div>
          )}
          <div className="ml-4 space-y-1">
            {item.output.map((output, index) => (
              <OutputRenderer key={index} output={output} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

interface OutputRendererProps {
  output: OutputItem;
}

const OutputRenderer: React.FC<OutputRendererProps> = ({ output }) => {
  const displayText = useTypewriter(output.content);

  switch (output.type) {
    case 'text':
      return <div className="text-green-400">{displayText}</div>;
    case 'error':
      return <div className="text-red-400">{displayText}</div>;
    case 'link':
      return (
        <a 
          href={output.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline"
        >
          {displayText}
        </a>
      );
    case 'ascii':
      return (
        <pre className="text-green-500 text-xs sm:text-sm whitespace-pre">
          {output.content}
        </pre>
      );
    case 'weather':
      return (
        <div className="bg-gray-800 p-2 rounded text-blue-300">
          {displayText}
        </div>
      );
    default:
      return <div className="text-green-400">{displayText}</div>;
  }
};

export default CommandHistory;