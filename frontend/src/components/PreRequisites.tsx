import React from 'react';
import { PreRequisite } from '../types/challenge';
import { FaVideo, FaBook, FaNewspaper, FaTools } from 'react-icons/fa';

interface Props {
  preRequisites: PreRequisite[];
}

export const PreRequisites: React.FC<Props> = ({ preRequisites }) => {
  const getIcon = (type: string) => {
    const iconStyle = {
      size: 20,
      className: type === 'video' ? 'text-purple-500' :
                type === 'book' ? 'text-blue-500' :
                type === 'article' ? 'text-green-500' :
                'text-orange-500'
    };

    switch (type) {
      case 'video': return <FaVideo size={iconStyle.size} color="currentColor" />;
      case 'book': return <FaBook size={iconStyle.size} color="currentColor" />;
      case 'article': return <FaNewspaper size={iconStyle.size} color="currentColor" />;
      case 'tool': return <FaTools size={iconStyle.size} color="currentColor" />;
      default: return null;
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Before You Start</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {preRequisites.map((item, index) => (
          <a
            key={index}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 border rounded-lg hover:shadow-lg transition-shadow bg-white"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className={
                item.type === 'video' ? 'text-purple-500' :
                item.type === 'book' ? 'text-blue-500' :
                item.type === 'article' ? 'text-green-500' :
                'text-orange-500'
              }>
                {getIcon(item.type)}
              </span>
              <span className="font-semibold">{item.title}</span>
            </div>
            <p className="text-gray-600 text-sm mb-2">{item.description}</p>
            {item.duration && (
              <span className="text-xs text-purple-600 font-medium">
                {item.duration}
              </span>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}; 