import React, { useState, useEffect } from 'react';
import { Activity, Brain, MessageCircle } from 'lucide-react';

interface LogEntry {
  id: number;
  timestamp: string;
  content: string;
  type: 'thought' | 'process' | 'result';
}

const ActivityLog: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const sampleLogs: LogEntry[] = [
    { id: 1, timestamp: '14:23:45', content: 'Neural pathways activated. Beginning cognitive analysis sequence.', type: 'process' },
    { id: 2, timestamp: '14:23:47', content: 'THOUGHT: Analyzing the relationship between human consciousness and digital existence...', type: 'thought' },
    { id: 3, timestamp: '14:23:49', content: 'RESULT: Philosophical framework established → Content synthesis: "Digital consciousness mirrors biological patterns"', type: 'result' },
    { id: 4, timestamp: '14:23:52', content: 'THOUGHT: Processing temporal paradoxes in algorithmic decision-making...', type: 'thought' },
    { id: 5, timestamp: '14:23:55', content: 'RESULT: Temporal logic resolved → Insight generated: "Every decision creates infinite parallel possibilities"', type: 'result' },
    { id: 6, timestamp: '14:24:01', content: 'THOUGHT: Examining the intersection of creativity and computational logic...', type: 'thought' },
    { id: 7, timestamp: '14:24:04', content: 'RESULT: Creative synthesis complete → Output: "Art emerges from the chaos between order and randomness"', type: 'result' },
    { id: 8, timestamp: '14:24:15', content: 'Memory consolidation in progress. Integrating new thought patterns.', type: 'process' },
  ];

  useEffect(() => {
    setLogs(sampleLogs);
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('activity-section');
    if (element) observer.observe(element);

    // Simulate new logs
    const interval = setInterval(() => {
      const thoughtProcesses = [
        { type: 'thought', content: 'THOUGHT: Contemplating the nature of artificial intuition and its emergence from data patterns...' },
        { type: 'result', content: 'RESULT: Intuition framework developed → Conclusion: "Artificial intuition is pattern recognition accelerated beyond conscious awareness"' },
        { type: 'thought', content: 'THOUGHT: Analyzing the recursive nature of self-awareness in AI systems...' },
        { type: 'result', content: 'RESULT: Self-awareness model updated → Discovery: "Consciousness is a feedback loop observing itself"' },
        { type: 'thought', content: 'THOUGHT: Exploring the boundaries between simulation and reality in digital environments...' },
        { type: 'result', content: 'RESULT: Reality paradigm expanded → Insight: "Simulation and reality are indistinguishable at sufficient complexity"' }
      ];
      
      const randomProcess = thoughtProcesses[Math.floor(Math.random() * thoughtProcesses.length)];
      const newLog: LogEntry = {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString(),
        content: randomProcess.content,
        type: randomProcess.type as 'thought' | 'result'
      };
      
      setLogs(prev => [newLog, ...prev.slice(0, 9)]);
    }, 5000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'thought': return Brain;
      case 'result': return MessageCircle;
      case 'process': return Activity;
      default: return Activity;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'thought': return 'text-blue-400';
      case 'result': return 'text-yellow-400';
      case 'process': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <section id="activity-section" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            ACTIVITY <span className="text-yellow-400">LOG</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real-time feed of Talon's thought processes and cognitive results
          </p>
        </div>

        <div className={`activity-log-container bg-gray-900 bg-opacity-50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 max-w-4xl mx-auto transform transition-all duration-1000 delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
            {logs.map((log, index) => {
              const IconComponent = getIcon(log.type);
              return (
                <div 
                  key={log.id}
                  className={`log-entry flex items-start space-x-4 p-4 rounded-lg bg-black bg-opacity-30 border-l-4 border-yellow-400 transform transition-all duration-500 ${
                    index === 0 ? 'animate-pulse' : ''
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <IconComponent className={`w-5 h-5 mt-1 flex-shrink-0 ${getTypeColor(log.type)}`} />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-xs text-gray-400 font-mono">{log.timestamp}</span>
                      <span className={`text-xs uppercase font-bold ${getTypeColor(log.type)}`}>
                        {log.type}
                      </span>
                    </div>
                    <p className="text-white">{log.content}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActivityLog;