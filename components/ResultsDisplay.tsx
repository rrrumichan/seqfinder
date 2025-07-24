
import React from 'react';
import type { SearchResult } from '../types';
import { exportToCsv } from '../services/csvExporter';
import { DownloadIcon } from './icons/DownloadIcon';
import { SequenceVisualizer } from './SequenceVisualizer';

interface ResultsDisplayProps {
  results: SearchResult[];
  targetSequence: string;
}

const ResultItem: React.FC<{ result: SearchResult }> = ({ result }) => {
  const { context, matchedSequence } = result;
  const upperContext = context.toUpperCase();
  const upperMatchedSequence = matchedSequence.toUpperCase();
  const matchIndex = upperContext.indexOf(upperMatchedSequence);

  let before = '';
  let match = '';
  let after = '';

  if (matchIndex !== -1) {
    before = upperContext.substring(0, matchIndex);
    match = upperContext.substring(matchIndex, matchIndex + upperMatchedSequence.length);
    after = upperContext.substring(matchIndex + upperMatchedSequence.length);
  } else {
    before = upperContext; // Failsafe
  }

  return (
    <tr className="bg-white hover:bg-gray-50 border-b">
      <td className="px-4 py-3 text-sm text-gray-700 font-medium break-all">{result.sequenceId}</td>
      <td className="px-4 py-3 text-sm text-gray-600">{result.position}</td>
      <td className="px-4 py-3">
        <div className="w-full max-w-xs mx-auto">
            <SequenceVisualizer 
                fullLength={result.fullSequenceLength} 
                matchPosition={result.position}
            />
        </div>
      </td>
      <td className="px-4 py-3">
        <code className="text-xs sm:text-sm bg-gray-100 p-1 rounded font-mono break-all">
          <span>{before}</span>
          <span className="bg-yellow-300 font-bold text-black rounded-sm px-0.5">{match}</span>
          <span>{after}</span>
        </code>
      </td>
    </tr>
  );
};


export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, targetSequence }) => {
  if (results.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-2">검색 결과</h3>
        <p className="text-gray-500">"<span className="font-bold">{targetSequence}</span>"에 대한 검색 결과가 없습니다.</p>
      </div>
    );
  }

  const handleDownload = () => {
    exportToCsv(`seqfinder_results_${targetSequence}.csv`, results);
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-gray-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2 sm:mb-0">
          검색 결과 <span className="text-teal-600">({results.length}개 일치)</span>
        </h3>
        <button
          onClick={handleDownload}
          className="flex items-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <DownloadIcon className="w-5 h-5 mr-2" />
          <span>CSV로 다운로드</span>
        </button>
      </div>
      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold text-gray-700">시퀀스 ID</th>
              <th scope="col" className="px-4 py-3 font-semibold text-gray-700">위치 (bp)</th>
              <th scope="col" className="px-4 py-3 font-semibold text-gray-700">위치 시각화</th>
              <th scope="col" className="px-4 py-3 font-semibold text-gray-700">컨텍스트 (±20bp)</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <ResultItem key={`${result.sequenceId}-${result.position}-${index}`} result={result} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
