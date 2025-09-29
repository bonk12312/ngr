import React, { useState, useEffect } from 'react';
import { Brain, Cpu, Network } from 'lucide-react';

const AlgorithmDescription: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('algorithm-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Brain,
      title: "Neural Processing",
      description: "Advanced AI that learns from every interaction and continuously evolves its tweeting patterns."
    },
    {
      icon: Cpu,
      title: "Real-time Analysis",
      description: "Processes millions of data points per second to generate contextually relevant content."
    },
    {
      icon: Network,
      title: "Infinite Output",
      description: "Designed to operate continuously without breaks, creating an endless stream of content."
    }
  ];

  return (
    <section id="algorithm-section" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            THE <span className="text-yellow-400">ALGORITHM</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A revolutionary AI system designed to generate an endless stream of thoughts, 
            insights, and observations. Once activated, it cannot be stopped through conventional means.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`interactive-card bg-gray-900 bg-opacity-50 p-8 rounded-2xl border border-gray-700 hover:border-yellow-400 transition-all duration-500 transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <feature.icon className="w-12 h-12 text-yellow-400 mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AlgorithmDescription;