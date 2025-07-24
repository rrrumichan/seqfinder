
import React from 'react';
import { DnaIcon } from './icons/DnaIcon';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-teal-500 p-2 rounded-lg">
            <DnaIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">SeqFinder</h1>
            <p className="text-sm text-gray-500 hidden sm:block">
              대량의 시퀀스 데이터에서 원하는 염기서열을 빠르게 찾아보세요.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
