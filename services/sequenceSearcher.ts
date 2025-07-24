
import type { ParsedFasta, SearchResult } from '../types';

export const searchSequences = (
  fastaData: ParsedFasta[],
  target: string,
  contextSize: number = 20
): SearchResult[] => {
  const results: SearchResult[] = [];
  if (!target) return results;

  const upperTarget = target.toUpperCase();

  fastaData.forEach(entry => {
    // Remove all whitespace and make it uppercase for case-insensitive search
    const cleanSequence = entry.sequence.replace(/\s/g, '').toUpperCase();
    let startIndex = 0;
    let index;

    while ((index = cleanSequence.indexOf(upperTarget, startIndex)) > -1) {
      const startContext = Math.max(0, index - contextSize);
      const endContext = Math.min(cleanSequence.length, index + upperTarget.length + contextSize);

      const context = cleanSequence.substring(startContext, endContext);
      
      results.push({
        sequenceId: entry.id,
        position: index + 1, // 1-based indexing for biologists
        matchedSequence: upperTarget,
        context: context,
        fullSequenceLength: cleanSequence.length,
      });

      // Continue search from the character after the start of the current match
      startIndex = index + 1; 
    }
  });

  return results;
};
