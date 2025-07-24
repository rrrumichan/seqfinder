
import React from 'react';
import { SearchIcon } from './icons/SearchIcon';

interface SearchControlProps {
  targetSequence: string;
  onTargetSequenceChange: (value: string) => void;
  onSearch: () => void;
  isDisabled: boolean;
}

export const SearchControl: React.FC<SearchControlProps> = ({
  targetSequence,
  onTargetSequenceChange,
  onSearch,
  isDisabled,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
      <div className="relative flex-grow w-full">
        <input
          type="text"
          placeholder="예: ATGCGT"
          value={targetSequence}
          onChange={(e) => onTargetSequenceChange(e.target.value.toUpperCase())}
          onKeyDown={handleKeyDown}
          className="w-full p-3 pl-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow duration-200 text-lg font-mono tracking-widest"
          disabled={isDisabled}
        />
      </div>
      <button
        onClick={onSearch}
        disabled={isDisabled}
        className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-teal-500 text-white font-bold rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        <SearchIcon className="w-5 h-5 mr-2" />
        <span>검색</span>
      </button>
    </div>
  );
};
