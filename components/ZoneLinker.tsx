import React from 'react';
import { useRouter } from 'next/router';

interface ZoneLinkerProps {
  children: string;
  className?: string;
}

interface Zone {
  id: number;
  emoji: string;
  title: string;
  theme: string;
  color: string;
  bgGradient: string;
  borderColor: string;
}

// Define all available zones with their properties
const zones: Zone[] = [
  {
    id: 1,
    emoji: '🧱',
    title: 'The Wall',
    theme: 'Barriers & Protection',
    color: 'blue',
    bgGradient: 'from-blue-50 to-cyan-50',
    borderColor: 'border-blue-500'
  },
  {
    id: 2,
    emoji: '🕵',
    title: 'The Trap Room',
    theme: 'Scams & Tricks',
    color: 'red',
    bgGradient: 'from-red-50 to-orange-50',
    borderColor: 'border-red-500'
  },
  {
    id: 3,
    emoji: '🔑',
    title: 'The Lockbox',
    theme: 'Access & Authentication',
    color: 'indigo',
    bgGradient: 'from-indigo-50 to-purple-50',
    borderColor: 'border-indigo-500'
  },
  {
    id: 4,
    emoji: '🧬',
    title: 'The Data Vault',
    theme: 'Privacy & Data',
    color: 'green',
    bgGradient: 'from-green-50 to-emerald-50',
    borderColor: 'border-green-500'
  },
  {
    id: 5,
    emoji: '🕸',
    title: 'The Shadow Net',
    theme: 'Advanced Threats',
    color: 'purple',
    bgGradient: 'from-purple-50 to-pink-50',
    borderColor: 'border-purple-500'
  },
  {
    id: 6,
    emoji: '🧠',
    title: 'The Mind Zone',
    theme: 'Human Psychology',
    color: 'orange',
    bgGradient: 'from-orange-50 to-yellow-50',
    borderColor: 'border-orange-500'
  }
];

const ZoneLinker: React.FC<ZoneLinkerProps> = ({ children, className = '' }) => {
  const router = useRouter();

  const handleZoneClick = (zone: Zone) => {
    // Navigate to the glossary page with the specific zone selected
    router.push(`/cyberpedia/glossary?zone=${encodeURIComponent(zone.title.toLowerCase().replace(/\s+/g, '-'))}`);
  };

  // Function to find and replace zone references with clickable buttons
  const processText = (text: string) => {
    const parts: (string | JSX.Element)[] = [];
    let lastIndex = 0;

    // Create regex patterns for each zone
    zones.forEach(zone => {
      // Pattern to match zone references like "🧬 The Data Vault (Digital Footprint)"
      const pattern = new RegExp(`(${zone.emoji}\\s*${zone.title}\\s*\\([^)]*\\))`, 'g');
      
      let match;
      while ((match = pattern.exec(text)) !== null) {
        const fullMatch = match[0];
        const matchIndex = match.index;
        
        // Add text before the match
        if (matchIndex > lastIndex) {
          parts.push(text.substring(lastIndex, matchIndex));
        }
        
        // Add clickable zone button
        parts.push(
          <button
            key={`${zone.id}-${matchIndex}`}
            onClick={() => handleZoneClick(zone)}
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105 hover:shadow-md border-2 ${zone.borderColor} bg-gradient-to-r ${zone.bgGradient} text-gray-800 hover:text-gray-900 ${className}`}
            title={`Go to ${zone.title} - ${zone.theme}`}
          >
            <span className="mr-2">{zone.emoji}</span>
            <span>{zone.title}</span>
          </button>
        );
        
        lastIndex = matchIndex + fullMatch.length;
      }
    });

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : [text];
  };

  return <>{processText(children)}</>;
};

export default ZoneLinker;