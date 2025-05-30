export interface OutputItem {
  type: 'text' | 'error' | 'link' | 'ascii' | 'weather';
  content: string;
  url?: string;
}

export interface HistoryItem {
  id: number;
  command: string;
  output: OutputItem[];
}

export interface Project {
  name: string;
  description: string;
  url: string;
  tech: string[];
}

export interface Command {
  name: string;
  description: string;
}