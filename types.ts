
export interface ParsedFasta {
  id: string;
  sequence: string;
}

export interface SearchResult {
  sequenceId: string;
  position: number; // 1-based index for biologist-friendly display
  matchedSequence: string;
  context: string;
  fullSequenceLength: number;
}
