
import React from 'react';

interface SequenceVisualizerProps {
  fullLength: number;
  matchPosition: number;
}

export const SequenceVisualizer: React.FC<SequenceVisualizerProps> = ({ fullLength, matchPosition }) => {
  const percentage = fullLength > 0 ? ((matchPosition - 1) / fullLength) * 100 : 0;

  return (
    <div className="w-full my-1" title={`Position ${matchPosition} of ${fullLength} bp`}>
      <div className="relative h-2 bg-gray-200 rounded-full">
        <div
          className="absolute h-2 w-2 -mt-0.0 top-0 bg-red-500 rounded-full ring-2 ring-white"
          style={{ left: `calc(${percentage}% - 4px)` }}
        ></div>
      </div>
    </div>
  );
};
