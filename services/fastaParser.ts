
import type { ParsedFasta } from '../types';

export const parseFasta = (content: string): ParsedFasta[] => {
  if (!content.trim().startsWith('>')) {
    throw new Error("FASTA 형식이 잘못되었습니다. 파일이 '>' 문자로 시작하는지 확인해주세요.");
  }

  const sequences: ParsedFasta[] = [];
  const sequenceEntries = content.trim().split('>').slice(1);

  if (sequenceEntries.length === 0) {
    return [];
  }

  for (const entry of sequenceEntries) {
    const lines = entry.split('\n');
    const id = lines[0].trim();
    const sequence = lines.slice(1).join('').replace(/\s/g, ''); // Remove all whitespace
    if (id && sequence) {
      sequences.push({ id, sequence });
    }
  }

  return sequences;
};
