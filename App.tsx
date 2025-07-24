
import React, { useState, useCallback, useMemo } from 'react';
import { Header } from './components/Header';
import { FileUpload } from './components/FileUpload';
import { SearchControl } from './components/SearchControl';
import { ResultsDisplay } from './components/ResultsDisplay';
import { parseFasta } from './services/fastaParser';
import { searchSequences } from './services/sequenceSearcher';
import type { ParsedFasta, SearchResult } from './types';

const App: React.FC = () => {
  const [fastaData, setFastaData] = useState<ParsedFasta[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [targetSequence, setTargetSequence] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const handleFileChange = useCallback((selectedFile: File | null) => {
    setFile(selectedFile);
    setError(null);
    setSearchResults([]);
    setFastaData([]);
    setHasSearched(false);
    if (selectedFile) {
      setIsLoading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const parsed = parseFasta(content);
          if (parsed.length === 0) {
            setError("FASTA 형식이 아니거나 파일 내용이 비어있습니다. '>'로 시작하는 헤더가 있는지 확인해주세요.");
          }
          setFastaData(parsed);
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('알 수 없는 오류가 발생했습니다.');
          }
        } finally {
          setIsLoading(false);
        }
      };
      reader.onerror = () => {
        setError('파일을 읽는 중 오류가 발생했습니다.');
        setIsLoading(false);
      };
      reader.readAsText(selectedFile);
    }
  }, []);

  const handleSearch = useCallback(() => {
    if (!targetSequence) {
      setError('검색할 염기서열을 입력해주세요.');
      return;
    }
    if (!/^[ATGCUNRYKMSWBDHV]+$/i.test(targetSequence)) {
        setError("염기서열은 ATGC 또는 IUPAC 문자로만 구성되어야 합니다.");
        return;
    }
    if (targetSequence.length < 3) {
      setError('검색할 염기서열이 너무 짧습니다. 최소 3자 이상 입력해주세요.');
      return;
    }
    if (fastaData.length === 0) {
      setError('먼저 FASTA 파일을 업로드해주세요.');
      return;
    }

    setError(null);
    setIsLoading(true);
    setHasSearched(true);
    
    // Simulate processing time for better UX
    setTimeout(() => {
        const results = searchSequences(fastaData, targetSequence);
        setSearchResults(results);
        setIsLoading(false);
    }, 500);

  }, [targetSequence, fastaData]);
  
  const totalSequences = useMemo(() => fastaData.length, [fastaData]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-xl font-bold text-gray-700 mb-4">1. FASTA 파일 업로드</h2>
            <FileUpload onFileChange={handleFileChange} file={file} />
            {file && totalSequences > 0 && (
                <div className="mt-4 text-sm text-green-700 bg-green-50 p-3 rounded-lg">
                    <p><strong>{file.name}</strong> 파일이 성공적으로 로드되었습니다. 총 <strong>{totalSequences}</strong>개의 시퀀스를 발견했습니다.</p>
                </div>
            )}
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-xl font-bold text-gray-700 mb-4">2. 검색할 염기서열 입력</h2>
            <SearchControl 
              targetSequence={targetSequence} 
              onTargetSequenceChange={setTargetSequence} 
              onSearch={handleSearch}
              isDisabled={!file || isLoading}
            />
          </div>

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
              <p className="font-bold">오류</p>
              <p>{error}</p>
            </div>
          )}

          {isLoading && (
            <div className="flex justify-center items-center p-8 space-x-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
              <p className="text-lg text-gray-600">검색 중입니다...</p>
            </div>
          )}

          {!isLoading && hasSearched && (
            <ResultsDisplay results={searchResults} targetSequence={targetSequence} />
          )}

        </div>
      </main>
      <footer className="text-center p-4 text-xs text-gray-500 mt-8">
        © 2025 SeqFinder. Created for efficient bioinformatics research.
      </footer>
    </div>
  );
};

export default App;
