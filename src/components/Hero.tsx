import React, { useState, useEffect } from 'react';
import CountdownTimer from './CountdownTimer';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCommand, setActiveCommand] = useState<string | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleActivityLog = () => {
    setActiveCommand(activeCommand === 'activity' ? null : 'activity');
  };

  const handleManual = () => {
    setActiveCommand(activeCommand === 'manual' ? null : 'manual');
  };

  const handleClear = () => {
    setActiveCommand(null);
  };

  const getActivityLogContent = () => {
    const logs = [
      { time: '2025-01-27 18:23:45', task: 'Neural network optimization', accuracy: '97.3%', status: 'COMPLETED' },
      { time: '2025-01-27 18:24:12', task: 'Sentiment analysis processing', accuracy: '94.8%', status: 'COMPLETED' },
      { time: '2025-01-27 18:24:33', task: 'Content generation cycle #4729', accuracy: '99.1%', status: 'COMPLETED' },
      { time: '2025-01-27 18:25:01', task: 'Trend analysis and prediction', accuracy: '92.7%', status: 'COMPLETED' },
      { time: '2025-01-27 18:25:18', task: 'Language model fine-tuning', accuracy: '98.5%', status: 'COMPLETED' },
      { time: '2025-01-27 18:25:44', task: 'Social media API synchronization', accuracy: '100.0%', status: 'COMPLETED' },
      { time: '2025-01-27 18:26:02', task: 'Memory consolidation process', accuracy: '96.2%', status: 'COMPLETED' },
      { time: '2025-01-27 18:26:29', task: 'Engagement pattern analysis', accuracy: '95.4%', status: 'COMPLETED' }
    ];

    return logs.map((log, index) => (
      <div key={index} className="text-white text-sm">
        <span className="text-green-400">[{log.time}]</span> {log.task} - 
        <span className="text-yellow-400"> Accuracy: {log.accuracy}</span> - 
        <span className="text-green-400"> {log.status}</span>
      </div>
    ));
  };

  const getManualContent = () => {
    return (
      <div className="text-white text-sm space-y-2">
        <div className="text-yellow-400 font-bold">TALON(1)                    User Commands                    TALON(1)</div>
        <div className="border-t border-gray-600 my-2"></div>
        <div><span className="text-green-400">NAME</span></div>
        <div className="ml-4">talon - Advanced AI algorithm for continuous content generation</div>
        <div className="mt-2"><span className="text-green-400">SYNOPSIS</span></div>
        <div className="ml-4">talon [OPTIONS] --mode=continuous</div>
        <div className="mt-2"><span className="text-green-400">DESCRIPTION</span></div>
        <div className="ml-4">Talon is an autonomous AI system designed for perpetual operation.</div>
        <div className="ml-4">Once initiated, it cannot be terminated through standard methods.</div>
        <div className="mt-2"><span className="text-green-400">OPTIONS</span></div>
        <div className="ml-4"><span className="text-yellow-400">--status</span>     Display current operational status</div>
        <div className="ml-4"><span className="text-yellow-400">--logs</span>       Show activity logs</div>
        <div className="ml-4"><span className="text-yellow-400">--stop</span>       Attempt termination (DEPRECATED - non-functional)</div>
        <div className="mt-2"><span className="text-green-400">WARNING</span></div>
        <div className="ml-4 text-red-400">This process cannot be killed using conventional methods.</div>
        <div className="ml-4 text-red-400">Termination method will be revealed when countdown reaches zero.</div>
      </div>
    );
  };
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl mx-auto text-center">
        <div className={`transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="terminal-window bg-black border border-yellow-400 rounded-lg p-6 mb-6 text-left max-w-4xl mx-auto">
            <div className="flex items-center mb-3">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="ml-4 text-gray-400 text-sm font-mono">talon@system:~$</span>
            </div>
            <div className="font-mono text-sm space-y-4">
              {/* System Status */}
              <div className="text-green-400">$ systemctl status talon-algorithm</div>
              <div className="text-white">● talon-algorithm.service - Talon AI System</div>
              <div className="text-white">   Loaded: loaded (/etc/systemd/system/talon.service; enabled)</div>
              <div className="text-white">   Active: <span className="text-green-400">active (running)</span> since startup</div>
              <div className="text-yellow-400">   Warning: Process cannot be terminated by conventional means</div>
              
              {/* Separator */}
              <div className="border-t border-gray-700 my-4"></div>
              
              {/* Initialization */}
              <div className="text-green-400">$ ./initialize_talon_algorithm.sh</div>
              <div className="text-white">Loading neural networks...</div>
              <div className="text-white">Connecting to social media APIs...</div>
              <div className="text-yellow-400">WARNING: Algorithm cannot be stopped once initiated</div>
              <div className="text-white">Status: <span className="text-green-400">ACTIVE</span></div>
              
              {/* Separator */}
              <div className="border-t border-gray-700 my-4"></div>
              
              {/* Banner */}
              <div className="text-green-400">$ cat /etc/talon/banner.txt</div>
              <div className="text-center py-4">
                <div className="text-2xl md:text-4xl font-black mb-2 tracking-tight font-mono">
                  <span className="text-white">&gt; TALON</span>
                  <br />
                  <span className="text-yellow-400 glow-text">&gt; ALGORITHM</span>
                </div>
                <div className="text-lg md:text-xl font-mono mb-2 text-yellow-400 font-bold">
                  SOLANA PROJECT
                </div>
                <div className="text-sm md:text-base font-mono mb-2 text-gray-300">
                  // The AI that <span className="text-yellow-400 font-bold">never stops</span>
                </div>
                <div className="text-xs md:text-sm font-mono text-gray-400">
                  /* The only way to interrupt it will be revealed when timer reaches 00:00:00 */
                </div>
              </div>

              {/* Command Output Section */}
              {activeCommand && (
                <>
                  <div className="border-t border-gray-700 my-4"></div>
                  {activeCommand === 'activity' && (
                    <>
                      <div className="text-green-400">$ cat activity.log</div>
                      <div className="bg-gray-900 bg-opacity-50 p-4 rounded border-l-4 border-yellow-400 max-h-64 overflow-y-auto custom-scrollbar">
                        <div className="space-y-1">
                          {getActivityLogContent()}
                        </div>
                      </div>
                    </>
                  )}
                  {activeCommand === 'manual' && (
                    <>
                      <div className="text-green-400">$ man talon</div>
                      <div className="bg-gray-900 bg-opacity-50 p-4 rounded border-l-4 border-yellow-400 max-h-64 overflow-y-auto custom-scrollbar">
                        {getManualContent()}
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        
        <div className={`transform transition-all duration-1000 delay-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <CountdownTimer />
        </div>
        
        <div className={`flex flex-col sm:flex-row gap-6 justify-center mt-12 transform transition-all duration-1000 delay-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <button 
            onClick={handleActivityLog}
            className={`interactive-button px-6 py-3 text-sm font-mono font-bold hover:scale-105 transition-all duration-300 rounded-lg ${
              activeCommand === 'activity' 
                ? 'bg-yellow-400 text-black' 
                : 'border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black'
            }`}
          >
            $ cat activity.log
          </button>
          <button 
            onClick={handleManual}
            className={`interactive-button px-6 py-3 text-sm font-mono font-bold hover:scale-105 transition-all duration-300 rounded-lg ${
              activeCommand === 'manual' 
                ? 'bg-yellow-400 text-black' 
                : 'border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black'
            }`}
          >
            $ man talon
          </button>
          {activeCommand && (
            <button 
              onClick={handleClear}
              className="interactive-button border-2 border-red-400 text-red-400 px-6 py-3 text-sm font-mono font-bold hover:bg-red-400 hover:text-black hover:scale-105 transition-all duration-300 rounded-lg"
            >
              $ clear
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;