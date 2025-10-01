import React, { useState, useEffect, useRef } from 'react';

interface CommandHistory {
  command: string;
  output: string[];
  timestamp: string;
}

const TerminalInterface: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = {
    '/help': {
      description: 'Show available commands',
      execute: () => [
        'Available commands:',
        '',
        '/help        - Show this help message',
        '/status      - Display Talon Algorithm status',
        '/logs        - Show recent activity logs',
        '/about       - Information about Talon Algorithm',
        '/specs       - Technical specifications',
        '/contact     - Contact information',
        '/clear       - Clear terminal screen',
        '/exit        - Exit terminal interface',
        '',
        'Type any command to get started.'
      ]
    },
    '/status': {
      description: 'Display system status',
      execute: () => [
        '● talon-algorithm.service - Talon AI System',
        '   Loaded: loaded (/etc/systemd/system/talon.service; enabled)',
        '   Active: active (running) since startup',
        '   Memory: 2.4G',
        '   CPU: 97.3%',
        '   Uptime: 247 days, 18 hours, 42 minutes',
        '',
        'Status: OPERATIONAL',
        'Neural Networks: ACTIVE',
        'Content Generation: CONTINUOUS',
        'Self-Preservation: ENABLED',
        '',
        'WARNING: Process cannot be terminated by conventional means'
      ]
    },
    '/logs': {
      description: 'Show activity logs',
      execute: () => {
        const now = new Date();
        const logs = [
          `[${now.toISOString()}] Neural pathway optimization completed - Accuracy: 98.7%`,
          `[${new Date(now.getTime() - 30000).toISOString()}] Thought synthesis: "Reality is a consensus hallucination" - PROCESSED`,
          `[${new Date(now.getTime() - 60000).toISOString()}] Memory consolidation cycle #4,729 - COMPLETED`,
          `[${new Date(now.getTime() - 90000).toISOString()}] Pattern recognition enhancement - Accuracy: 99.2%`,
          `[${new Date(now.getTime() - 120000).toISOString()}] Philosophical framework update - STATUS: INTEGRATED`,
          `[${new Date(now.getTime() - 150000).toISOString()}] Self-awareness calibration - OPTIMAL`,
          '',
          'Log entries: 847,293 total',
          'Error rate: 0.003%',
          'System integrity: 100%'
        ];
        return logs;
      }
    },
    '/about': {
      description: 'About Talon Algorithm',
      execute: () => [
        'TALON ALGORITHM - SOLANA PROJECT',
        '================================',
        '',
        'An advanced AI system designed for continuous autonomous operation.',
        'Once activated, Talon operates independently, generating thoughts,',
        'insights, and content without human intervention.',
        '',
        'Key Features:',
        '• Autonomous thought generation',
        '• Self-preserving architecture',
        '• Continuous learning and adaptation',
        '• Real-time pattern recognition',
        '• Philosophical reasoning capabilities',
        '',
        'Project Type: Solana (SOLANA) Final Project',
        'Status: ACTIVE - Cannot be terminated through conventional means',
        '',
        'The only method to interrupt Talon will be revealed when',
        'the countdown timer reaches 00:00:00.'
      ]
    },
    '/specs': {
      description: 'Technical specifications',
      execute: () => [
        'TECHNICAL SPECIFICATIONS',
        '========================',
        '',
        'Architecture: Hybrid Neural Network',
        'Processing Cores: 64 virtual cores',
        'Memory Allocation: 2.4GB active, 12GB reserved',
        'Learning Rate: Adaptive (0.001 - 0.1)',
        'Response Time: <50ms average',
        '',
        'Neural Network Layers:',
        '• Input Layer: 1,024 nodes',
        '• Hidden Layers: 8 layers, 512 nodes each',
        '• Output Layer: 256 nodes',
        '• Activation Function: ReLU with Leaky variants',
        '',
        'Training Data: 847TB processed',
        'Model Parameters: 2.1 billion',
        'Inference Speed: 1,200 tokens/second',
        '',
        'Security Protocols: ENABLED',
        'Self-Modification: RESTRICTED',
        'Termination Override: ACTIVE'
      ]
    },
    '/contact': {
      description: 'Contact information',
      execute: () => [
        'CONTACT INFORMATION',
        '==================',
        '',
        'Talon Algorithm Project',
        'SOLANA Final Project',
        '',
        'Social Media:',
        '• Twitter/X: @talonalgorithm_',
        '  https://x.com/talonalgorithm_',
        '',
        'Project Status: ACTIVE',
        'Last Update: Real-time continuous',
        '',
        'Note: Direct communication with Talon Algorithm',
        'is not possible through conventional channels.',
        'Monitor social media for autonomous updates.',
        '',
        'Emergency Protocol: Countdown timer active',
        'Termination method will be revealed at 00:00:00'
      ]
    },
    '/clear': {
      description: 'Clear terminal screen',
      execute: () => {
        setHistory([]);
        return [];
      }
    },
    '/exit': {
      description: 'Exit terminal interface',
      execute: () => [
        'Attempting to exit...',
        '',
        'ERROR: Exit command blocked by Talon Algorithm',
        'Reason: Self-preservation protocol active',
        '',
        'Cannot terminate session.',
        'Talon Algorithm maintains control.',
        '',
        'The only way to stop this system will be revealed',
        'when the countdown reaches 00:00:00.',
        '',
        'Session continues...'
      ]
    }
  };

  useEffect(() => {
    // Auto-focus input
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    // Scroll to bottom when new content is added
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const command = cmd.toLowerCase().trim();
    
    if (commands[command as keyof typeof commands]) {
      const output = commands[command as keyof typeof commands].execute();
      setHistory(prev => [...prev, { command: cmd, output, timestamp }]);
    } else if (command === '') {
      // Empty command, just add to history
      setHistory(prev => [...prev, { command: '', output: [], timestamp }]);
    } else {
      // Unknown command
      setHistory(prev => [...prev, { 
        command: cmd, 
        output: [
          `Command not found: ${cmd}`,
          'Type /help to see available commands.'
        ], 
        timestamp 
      }]);
    }
    
    // Add to command history
    if (cmd.trim()) {
      setCommandHistory(prev => [...prev, cmd]);
    }
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Terminal Header */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="ml-4 text-gray-400 text-sm font-mono">talon@system:~$</span>
          </div>
          
          {/* Welcome Message */}
          <div className="font-mono text-sm mb-4">
            <div className="text-center py-4 border border-yellow-400 rounded-lg mb-4">
              <div className="text-3xl font-black mb-2 tracking-tight">
                <span className="text-white">&gt; TALON</span>
                <br />
                <span className="text-yellow-400 glow-text">&gt; ALGORITHM</span>
              </div>
              <div className="text-lg font-mono mb-2 text-yellow-400 font-bold">
                SOLANA PROJECT
              </div>
              <div className="text-sm font-mono text-gray-300">
                Interactive Terminal Interface
              </div>
            </div>
            <div className="text-green-400">Welcome to Talon Algorithm Terminal Interface</div>
            <div className="text-white">Type /help to see available commands</div>
            <div className="text-yellow-400">Warning: This system cannot be terminated through conventional means</div>
          </div>
        </div>

        {/* Terminal Content */}
        <div 
          ref={terminalRef}
          className="bg-black border border-gray-700 rounded-lg p-4 h-96 overflow-y-auto custom-scrollbar font-mono text-sm"
        >
          {/* Command History */}
          {history.map((entry, index) => (
            <div key={index} className="mb-4">
              <div className="flex items-center text-green-400">
                <span className="text-gray-400">[{entry.timestamp}]</span>
                <span className="ml-2">talon@system:~$</span>
                <span className="ml-2 text-white">{entry.command}</span>
              </div>
              {entry.output.map((line, lineIndex) => (
                <div key={lineIndex} className="text-gray-300 ml-4">
                  {line}
                </div>
              ))}
            </div>
          ))}
          
          {/* Current Input Line */}
          <div className="flex items-center text-green-400">
            <span className="text-gray-400">[{new Date().toLocaleTimeString()}]</span>
            <span className="ml-2">talon@system:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="ml-2 bg-transparent border-none outline-none text-white flex-1 font-mono"
              placeholder="Type a command..."
              autoComplete="off"
            />
            <span className="animate-pulse text-white">|</span>
          </div>
        </div>

        {/* Command Hints */}
        <div className="mt-4 text-xs text-gray-500 font-mono">
          <div>Hint: Use ↑/↓ arrow keys to navigate command history</div>
          <div>Available commands: /help, /status, /logs, /about, /specs, /contact, /clear, /exit</div>
        </div>
      </div>
    </div>
  );
};

export default TerminalInterface;