import React, { useRef } from 'react';
import anime from 'animejs';
import { LucideIcon } from 'lucide-react';

interface DomainCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
  delay?: number;
}

const DomainCard: React.FC<DomainCardProps> = ({ title, description, Icon, delay = 0 }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    anime({
      targets: cardRef.current,
      translateY: -10,
      scale: 1.02,
      duration: 400,
      easing: 'easeOutElastic(1, .8)'
    });
    
    anime({
      targets: glowRef.current,
      opacity: 1,
      duration: 300,
      easing: 'easeOutQuad'
    });
  };

  const handleMouseLeave = () => {
    anime({
      targets: cardRef.current,
      translateY: 0,
      scale: 1,
      duration: 400,
      easing: 'easeOutElastic(1, .8)'
    });

    anime({
      targets: glowRef.current,
      opacity: 0,
      duration: 300,
      easing: 'easeOutQuad'
    });
  };

  return (
    <div 
      ref={cardRef}
      className="domain-card relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-md overflow-hidden opacity-0 cursor-pointer transition-colors duration-300 hover:border-blue-500/30"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Hover Glow Effect */}
      <div 
        ref={glowRef}
        className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-transparent opacity-0 pointer-events-none" 
      />
      
      <div className="relative z-10 flex flex-col items-start gap-4">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-blue-400">
          <Icon size={32} strokeWidth={1.5} />
        </div>
        <h4 className="text-2xl font-semibold text-white">{title}</h4>
        <p className="text-gray-400 leading-relaxed text-sm">
          {description}
        </p>
      </div>
    </div>
  );
};

export default DomainCard;
