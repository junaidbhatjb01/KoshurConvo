
import React from 'react';
import MessageCard from './MessageCard';

interface ResultDisplayProps {
  messages: string[];
  isLoading: boolean;
  error: string | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ messages, isLoading, error }) => {
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-400"></div>
          <p className="ml-3 text-gray-400">Crafting your messages...</p>
        </div>
      );
    }
    if (error) {
      return (
        <div className="flex items-center justify-center h-full text-red-400 text-center">
          <p>{error}</p>
        </div>
      );
    }
    if (messages.length === 0) {
      return (
        <div className="flex items-center justify-center h-full text-gray-500">
          <p>Your generated messages will appear here.</p>
        </div>
      );
    }
    return null; // The placeholder container is not needed when results are shown
  };

  if (!isLoading && !error && messages.length > 0) {
    return (
      <div className="w-full space-y-4">
        <h3 className="text-lg font-semibold text-gray-300">Generated Messages:</h3>
        {messages.map((msg, index) => (
          <MessageCard key={index} message={msg} />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-800/50 p-4 border border-dashed border-gray-700 rounded-xl min-h-[200px] flex flex-col justify-center">
      {renderContent()}
    </div>
  );
};

export default ResultDisplay;
