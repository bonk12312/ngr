import React, { useState, useEffect } from 'react';

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const todayTarget = new Date(now);
todayTarget.setHours(18, 0, 0, 0); // 6 PM today

      
      // Convert to Chisinau time (UTC+2)
      const chisinauOffset = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
      const targetTime = todayTarget.getTime() + chisinauOffset;
      const currentTime = now.getTime() + chisinauOffset;
      
      const difference = targetTime - currentTime;
      
      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        return { hours, minutes, seconds };
      }
      
      return { hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time: number) => time.toString().padStart(2, '0');

  return (
    <div className="countdown-container bg-gray-900 bg-opacity-80 backdrop-blur-sm rounded-lg p-6 border border-yellow-400 border-opacity-50 font-mono">
      <h3 className="text-lg font-bold mb-4 text-yellow-400">$ ./reveal_countdown.sh</h3>
      <div className="flex justify-center space-x-6">
        <div className="countdown-item">
          <div className="countdown-number text-3xl font-black text-white mb-1">
            {formatTime(timeLeft.hours)}
          </div>
          <div className="countdown-label text-yellow-400 font-semibold text-xs">HRS</div>
        </div>
        <div className="countdown-separator text-3xl font-black text-yellow-400">:</div>
        <div className="countdown-item">
          <div className="countdown-number text-3xl font-black text-white mb-1">
            {formatTime(timeLeft.minutes)}
          </div>
          <div className="countdown-label text-yellow-400 font-semibold text-xs">MIN</div>
        </div>
        <div className="countdown-separator text-3xl font-black text-yellow-400">:</div>
        <div className="countdown-item">
          <div className="countdown-number text-3xl font-black text-white mb-1">
            {formatTime(timeLeft.seconds)}
          </div>
          <div className="countdown-label text-yellow-400 font-semibold text-xs">SEC</div>
        </div>
      </div>
      <div className="mt-3 text-xs text-gray-400 text-center">
        Time until reveal: {timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 ? 'READY' : 'CALCULATING...'}
      </div>
    </div>
  );
};

export default CountdownTimer;