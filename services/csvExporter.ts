
import type { SearchResult } from '../types';

export const exportToCsv = (filename: string, data: SearchResult[]): void => {
  const headers = ['Sequence_ID', 'Position', 'Matched_Sequence', 'Context(+-20bp)'];
  const rows = data.map(result => [
    `"${result.sequenceId.replace(/"/g, '""')}"`,
    result.position,
    result.matchedSequence,
    `"${result.context.replace(/"/g, '""')}"`
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
