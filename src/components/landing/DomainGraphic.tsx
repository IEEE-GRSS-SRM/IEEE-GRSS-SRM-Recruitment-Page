import React from 'react';

interface DomainGraphicProps {
  domain: string;
}

export const DomainGraphic: React.FC<DomainGraphicProps> = ({ domain }) => {
  // Common styles/animations embedded in the SVG
  const animationStyles = `
    @keyframes spin-slow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes spin-reverse {
      from { transform: rotate(360deg); }
      to { transform: rotate(0deg); }
    }
    @keyframes pulse-slow {
      0%, 100% { opacity: 0.3; }
      50% { opacity: 0.8; }
    }
    @keyframes blink {
      0%, 100% { opacity: 0; }
      50% { opacity: 1; }
    }
    @keyframes dash {
      to {
        stroke-dashoffset: -40;
      }
    }
    @keyframes sonar-sweep {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes bar-grow {
      0%, 100% { height: 15px; }
      50% { height: 45px; }
    }
    @keyframes bar-grow-2 {
      0%, 100% { height: 25px; }
      50% { height: 60px; }
    }
    @keyframes bar-grow-3 {
      0%, 100% { height: 35px; }
      50% { height: 30px; }
    }
    .animate-spin-slow {
      animation: spin-slow 20s linear infinite;
      transform-origin: center;
    }
    .animate-spin-reverse {
      animation: spin-reverse 15s linear infinite;
      transform-origin: center;
    }
    .animate-pulse-slow {
      animation: pulse-slow 3s ease-in-out infinite;
    }
    .animate-blink {
      animation: blink 1s step-end infinite;
    }
    .animate-dash {
      stroke-dasharray: 5;
      animation: dash 2s linear infinite;
    }
    .animate-sweep {
      animation: sonar-sweep 6s linear infinite;
      transform-origin: center;
    }
    .animate-bar-1 {
      animation: bar-grow 2.5s ease-in-out infinite;
    }
    .animate-bar-2 {
      animation: bar-grow-2 3.1s ease-in-out infinite;
    }
    .animate-bar-3 {
      animation: bar-grow-3 2.1s ease-in-out infinite;
    }
  `;

  const renderGraphic = () => {
    switch (domain) {
      case 'AI/ML':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full text-cyan-400 select-none">
            <style>{animationStyles}</style>
            
            {/* Grid Pattern Background */}
            <defs>
              <pattern id="grid-ai" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(34, 211, 238, 0.05)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-ai)" rx="24" />

            {/* Rotating telemetry ring */}
            <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(34, 211, 238, 0.15)" strokeWidth="1" />
            <circle cx="100" cy="100" r="70" fill="none" stroke="rgba(34, 211, 238, 0.3)" strokeWidth="1.5" className="animate-dash" />
            <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(34, 211, 238, 0.1)" strokeWidth="1" />

            {/* Core Neural Net Nodes */}
            <g className="animate-spin-slow">
              <line x1="100" y1="60" x2="60" y2="100" stroke="rgba(34, 211, 238, 0.3)" strokeWidth="1" />
              <line x1="100" y1="60" x2="140" y2="100" stroke="rgba(34, 211, 238, 0.3)" strokeWidth="1" />
              <line x1="60" y1="100" x2="100" y2="140" stroke="rgba(34, 211, 238, 0.3)" strokeWidth="1" />
              <line x1="140" y1="100" x2="100" y2="140" stroke="rgba(34, 211, 238, 0.3)" strokeWidth="1" />
              <line x1="60" y1="100" x2="140" y2="100" stroke="rgba(34, 211, 238, 0.2)" strokeWidth="1" />
              <line x1="100" y1="60" x2="100" y2="140" stroke="rgba(34, 211, 238, 0.2)" strokeWidth="1" />

              <circle cx="100" cy="60" r="6" fill="#000" stroke="#22d3ee" strokeWidth="2" />
              <circle cx="60" cy="100" r="6" fill="#000" stroke="#22d3ee" strokeWidth="2" />
              <circle cx="140" cy="100" r="6" fill="#000" stroke="#22d3ee" strokeWidth="2" />
              <circle cx="100" cy="140" r="6" fill="#000" stroke="#22d3ee" strokeWidth="2" />
              <circle cx="100" cy="100" r="10" fill="#000" stroke="#22d3ee" strokeWidth="2" className="animate-pulse-slow" />
            </g>

            {/* Scanning line indicator */}
            <line x1="20" y1="100" x2="180" y2="100" stroke="rgba(34, 211, 238, 0.15)" strokeWidth="1" />
            
            {/* Tech Telemetry overlay */}
            <text x="25" y="35" className="font-mono text-[8px] fill-cyan-400/80 tracking-widest">NEURAL_NET: RUNNING</text>
            <text x="25" y="45" className="font-mono text-[7px] fill-cyan-400/50">EPOCH: 9284.1</text>
            <text x="25" y="175" className="font-mono text-[7px] fill-cyan-400/50">SYS_ACC: 98.42%</text>
            <text x="125" y="175" className="font-mono text-[7px] fill-cyan-400/50">LOC: 79.15E</text>
          </svg>
        );

      case 'Web Dev':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full text-blue-400 select-none">
            <style>{animationStyles}</style>

            <defs>
              <pattern id="grid-web" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(59, 130, 246, 0.05)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-web)" rx="24" />

            {/* Dev IDE window Mockup */}
            <rect x="20" y="30" width="160" height="140" rx="8" fill="rgba(0, 0, 0, 0.6)" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1.5" />
            
            {/* Header controls */}
            <circle cx="35" cy="42" r="3" fill="#ef4444" />
            <circle cx="45" cy="42" r="3" fill="#eab308" />
            <circle cx="55" cy="42" r="3" fill="#22c55e" />
            <line x1="20" y1="52" x2="180" y2="52" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="1" />

            {/* Code Line Mockups */}
            {/* Tag opening */}
            <text x="35" y="70" className="font-mono text-[10px] fill-blue-400 font-bold">&lt;grss&gt;</text>
            
            {/* Lines of code nested */}
            <rect x="48" y="80" width="85" height="4" rx="2" fill="rgba(59, 130, 246, 0.6)" />
            <rect x="48" y="92" width="110" height="4" rx="2" fill="rgba(147, 197, 253, 0.7)" />
            <rect x="48" y="104" width="70" height="4" rx="2" fill="rgba(192, 132, 252, 0.6)" />
            <rect x="48" y="116" width="95" height="4" rx="2" fill="rgba(59, 130, 246, 0.6)" />
            <rect x="48" y="128" width="55" height="4" rx="2" fill="rgba(147, 197, 253, 0.7)" />

            {/* Tag closing with blinking cursor */}
            <text x="35" y="145" className="font-mono text-[10px] fill-blue-400 font-bold">&lt;/grss&gt;</text>
            <rect x="90" y="136" width="6" height="10" fill="#60a5fa" className="animate-blink" />

            {/* Telemetry at the bottom */}
            <text x="30" y="185" className="font-mono text-[7px] fill-blue-400/50">BUILD: SUCCESSFUL</text>
            <text x="145" y="185" className="font-mono text-[7px] fill-blue-400/50">PORT: 5173</text>
          </svg>
        );

      case 'Creatives':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full text-purple-400 select-none">
            <style>{animationStyles}</style>

            <defs>
              <pattern id="grid-creative" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(168, 85, 247, 0.05)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-creative)" rx="24" />

            {/* Outer Design Canvas Guide Circles */}
            <circle cx="100" cy="100" r="82" fill="none" stroke="rgba(168, 85, 247, 0.08)" strokeWidth="1" />
            <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(168, 85, 247, 0.15)" strokeWidth="1" />

            {/* Stylized Vector Path Bezier Curve */}
            <path d="M 40,130 C 50,40 150,40 160,130" fill="none" stroke="url(#creative-grad)" strokeWidth="3" />
            
            {/* Gradient definition for paths */}
            <defs>
              <linearGradient id="creative-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#60a5fa" />
              </linearGradient>
            </defs>

            {/* Bezier Handles and Anchor Points */}
            <g>
              <line x1="40" y1="130" x2="50" y2="40" stroke="rgba(168, 85, 247, 0.4)" strokeWidth="1" strokeDasharray="3" />
              <line x1="160" y1="130" x2="150" y2="40" stroke="rgba(168, 85, 247, 0.4)" strokeWidth="1" strokeDasharray="3" />

              {/* Start anchor */}
              <rect x="36" y="126" width="8" height="8" fill="#000" stroke="#a855f7" strokeWidth="2" />
              {/* Control handle point 1 */}
              <circle cx="50" cy="40" r="4" fill="#a855f7" />
              {/* Control handle point 2 */}
              <circle cx="150" cy="40" r="4" fill="#60a5fa" />
              {/* End anchor */}
              <rect x="156" y="126" width="8" height="8" fill="#000" stroke="#60a5fa" strokeWidth="2" />
            </g>

            {/* Rotating central 3D wireframe geometric element */}
            <g className="animate-spin-reverse">
              <polygon points="100,75 122,88 122,112 100,125 78,112 78,88" fill="none" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="1" />
              <line x1="100" y1="75" x2="100" y2="125" stroke="rgba(168, 85, 247, 0.2)" strokeWidth="1" />
              <line x1="78" y1="88" x2="122" y2="112" stroke="rgba(168, 85, 247, 0.2)" strokeWidth="1" />
              <line x1="78" y1="112" x2="122" y2="88" stroke="rgba(168, 85, 247, 0.2)" strokeWidth="1" />
            </g>

            {/* HUD interface styling overlay */}
            <text x="25" y="30" className="font-mono text-[8px] fill-purple-400/80 tracking-widest">UI.UX_RENDER: 60FPS</text>
            <text x="25" y="180" className="font-mono text-[7px] fill-purple-400/50">CANVAS: 1080p</text>
            <text x="140" y="180" className="font-mono text-[7px] fill-purple-400/50">V_0.8.2b</text>
          </svg>
        );

      case 'Content & Research':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full text-teal-400 select-none">
            <style>{animationStyles}</style>

            <defs>
              <pattern id="grid-research" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(20, 184, 166, 0.05)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-research)" rx="24" />

            {/* Orbital ellipses (Globe Latitude/Longitude mock) */}
            <g className="animate-spin-slow">
              <ellipse cx="100" cy="100" rx="65" ry="30" fill="none" stroke="rgba(20, 184, 166, 0.25)" strokeWidth="1" />
              <ellipse cx="100" cy="100" rx="30" ry="65" fill="none" stroke="rgba(20, 184, 166, 0.25)" strokeWidth="1" />
              <ellipse cx="100" cy="100" rx="65" ry="65" fill="none" stroke="rgba(20, 184, 166, 0.1)" strokeWidth="1" />
              
              {/* Orbital node (Satellite) */}
              <circle cx="150" cy="78" r="5" fill="#000" stroke="#14b8a6" strokeWidth="2" />
              <line x1="100" y1="100" x2="150" y2="78" stroke="rgba(20, 184, 166, 0.3)" strokeWidth="1" strokeDasharray="2" />
            </g>

            {/* Central planet core/target circle */}
            <circle cx="100" cy="100" r="24" fill="none" stroke="#14b8a6" strokeWidth="2" />
            <circle cx="100" cy="100" r="14" fill="none" stroke="rgba(20, 184, 166, 0.4)" strokeWidth="1" />
            <circle cx="100" cy="100" r="6" fill="#14b8a6" className="animate-pulse-slow" />

            {/* Horizontal axis and coordinates telemetry */}
            <line x1="20" y1="100" x2="180" y2="100" stroke="rgba(20, 184, 166, 0.2)" strokeWidth="1" strokeDasharray="3" />
            <line x1="100" y1="20" x2="100" y2="180" stroke="rgba(20, 184, 166, 0.2)" strokeWidth="1" strokeDasharray="3" />

            {/* Digital scope overlays */}
            <text x="25" y="30" className="font-mono text-[8px] fill-teal-400/80 tracking-widest">EARTH_RESC: SYS_OK</text>
            <text x="25" y="42" className="font-mono text-[7px] fill-teal-400/50">COORD: 34°15'N 108°54'W</text>
            <text x="25" y="180" className="font-mono text-[7px] fill-teal-400/50">RADAR_TELEM: CONNECTED</text>
            <text x="145" y="180" className="font-mono text-[7px] fill-teal-400/50">LEO_ALT</text>
          </svg>
        );

      case 'Corporate':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full text-yellow-500 select-none">
            <style>{animationStyles}</style>

            <defs>
              <pattern id="grid-corp" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(234, 179, 8, 0.05)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-corp)" rx="24" />

            {/* Interconnected matrix grid dots */}
            <circle cx="50" cy="50" r="2" fill="rgba(234, 179, 8, 0.4)" />
            <circle cx="100" cy="50" r="2" fill="rgba(234, 179, 8, 0.4)" />
            <circle cx="150" cy="50" r="2" fill="rgba(234, 179, 8, 0.4)" />
            <circle cx="50" cy="100" r="2" fill="rgba(234, 179, 8, 0.4)" />
            <circle cx="150" cy="100" r="2" fill="rgba(234, 179, 8, 0.4)" />

            {/* Rising growth charting lines */}
            <path d="M 30,130 L 60,110 L 90,120 L 120,80 L 150,90 L 175,55" fill="none" stroke="#eab308" strokeWidth="2" />
            <path d="M 30,130 L 60,110 L 90,120 L 120,80 L 150,90 L 175,55" fill="none" stroke="rgba(234, 179, 8, 0.3)" strokeWidth="6" strokeLinecap="round" />

            {/* Dynamic data nodes on the chart */}
            <circle cx="60" cy="110" r="4" fill="#000" stroke="#eab308" strokeWidth="1.5" />
            <circle cx="120" cy="80" r="4" fill="#000" stroke="#eab308" strokeWidth="1.5" />
            <circle cx="175" cy="55" r="4.5" fill="#000" stroke="#eab308" strokeWidth="2" className="animate-pulse-slow" />

            {/* Mini HUD bar graph (animated) */}
            <g transform="translate(45, 140)">
              <rect x="0" y="0" width="8" height="15" fill="rgba(234, 179, 8, 0.5)" rx="1" className="animate-bar-1" transform="scale(1, -1)" />
              <rect x="15" y="0" width="8" height="25" fill="rgba(234, 179, 8, 0.7)" rx="1" className="animate-bar-2" transform="scale(1, -1)" />
              <rect x="30" y="0" width="8" height="10" fill="rgba(234, 179, 8, 0.5)" rx="1" className="animate-bar-3" transform="scale(1, -1)" />
              <rect x="45" y="0" width="8" height="35" fill="rgba(234, 179, 8, 0.8)" rx="1" className="animate-bar-2" transform="scale(1, -1)" />
              <rect x="60" y="0" width="8" height="20" fill="rgba(234, 179, 8, 0.5)" rx="1" className="animate-bar-1" transform="scale(1, -1)" />
              <rect x="75" y="0" width="8" height="30" fill="rgba(234, 179, 8, 0.7)" rx="1" className="animate-bar-3" transform="scale(1, -1)" />
              <rect x="90" y="0" width="8" height="40" fill="rgba(234, 179, 8, 0.9)" rx="1" className="animate-bar-2" transform="scale(1, -1)" />
            </g>

            {/* Status telemetry texts */}
            <text x="25" y="30" className="font-mono text-[8px] fill-yellow-500/80 tracking-widest">CORP.RELATIONS: OK</text>
            <text x="25" y="180" className="font-mono text-[7px] fill-yellow-500/50">KPI_GROWTH: +24.8%</text>
            <text x="135" y="180" className="font-mono text-[7px] fill-yellow-500/50">PARTNERS_10</text>
          </svg>
        );

      case 'Events':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full text-red-400 select-none">
            <style>{animationStyles}</style>

            <defs>
              <pattern id="grid-events" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(239, 68, 68, 0.05)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-events)" rx="24" />

            {/* Radar Coordinates grid */}
            <line x1="20" y1="100" x2="180" y2="100" stroke="rgba(239, 68, 68, 0.2)" strokeWidth="1" />
            <line x1="100" y1="20" x2="100" y2="180" stroke="rgba(239, 68, 68, 0.2)" strokeWidth="1" />

            <circle cx="100" cy="100" r="75" fill="none" stroke="rgba(239, 68, 68, 0.15)" strokeWidth="1" />
            <circle cx="100" cy="100" r="50" fill="none" stroke="rgba(239, 68, 68, 0.1)" strokeWidth="1" />
            <circle cx="100" cy="100" r="25" fill="none" stroke="rgba(239, 68, 68, 0.15)" strokeWidth="1" />

            {/* Pulsing event markers (venues targets) */}
            <g>
              {/* Event 1 */}
              <circle cx="130" cy="70" r="4.5" fill="#f87171" className="animate-blink" />
              <circle cx="130" cy="70" r="10" fill="none" stroke="rgba(239, 68, 68, 0.4)" strokeWidth="1" className="animate-pulse-slow" />
              <line x1="130" y1="70" x2="155" y2="55" stroke="rgba(239, 68, 68, 0.4)" strokeWidth="1" />
              <text x="157" y="55" className="font-mono text-[6px] fill-red-400/80">E_1:HACKATHON</text>

              {/* Event 2 */}
              <circle cx="65" cy="125" r="4" fill="#f87171" />
              <line x1="65" y1="125" x2="45" y2="145" stroke="rgba(239, 68, 68, 0.4)" strokeWidth="1" />
              <text x="25" y="152" className="font-mono text-[6px] fill-red-400/80">E_2:SUMMIT</text>
            </g>

            {/* Sweep Sonar Bar (Rotating) */}
            <g className="animate-sweep">
              <line x1="100" y1="100" x2="100" y2="25" stroke="rgba(239, 68, 68, 0.6)" strokeWidth="1.5" />
              <polygon points="100,100 100,25 115,28" fill="rgba(239, 68, 68, 0.08)" />
            </g>

            {/* Telemetry scope elements */}
            <text x="25" y="30" className="font-mono text-[8px] fill-red-400/80 tracking-widest">TACTICAL_SCHED: ACTIVE</text>
            <text x="25" y="180" className="font-mono text-[7px] fill-red-400/50">PLANNING_T: T-MINUS 12d</text>
            <text x="140" y="180" className="font-mono text-[7px] fill-red-400/50">SYS_S: SWEEP</text>
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      {renderGraphic()}
    </div>
  );
};
