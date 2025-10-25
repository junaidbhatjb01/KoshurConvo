
import React, { useState } from 'react';
import CopyIcon from './icons/CopyIcon';
import CheckIcon from './icons/CheckIcon';

interface MessageCardProps {
  message: string;
}

const MessageCard: React.FC<MessageCardProps> = ({ message }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if (!message) return;
    navigator.clipboard.writeText(message);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="relative p-4 bg-gray-800 rounded-lg border border-gray-700/50 shadow-md animate-fade-in">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-white transition-colors duration-200 rounded-full hover:bg-gray-600/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-teal-500"
        aria-label="Copy message"
      >
        {isCopied ? <CheckIcon className="w-5 h-5 text-teal-400" /> : <CopyIcon className="w-5 h-5" />}
      </button>
      <p className="text-gray-200 whitespace-pre-wrap pr-8">{message}</p>
    </div>
  );
};

// Simple fade-in animation using Tailwind config (or a style tag if not possible)
// This is a conceptual addition, as adding to tailwind.config.js is not possible here.
// Let's add a style tag to index.html for this animation. For now, it will just work without animation.

export default MessageCard;
