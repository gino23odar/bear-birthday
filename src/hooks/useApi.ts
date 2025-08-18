import { useState, useCallback } from 'react';
import { GenerateRequest, GenerateResponse } from '@/types';
import { generateContent, getStatus } from '@/lib/api';

export const useGenerateContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GenerateResponse | null>(null);

  const generate = useCallback(async (request: GenerateRequest) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await generateContent(request);
      setResult(response);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setError(null);
    setResult(null);
  }, []);

  return {
    generate,
    isLoading,
    error,
    result,
    reset,
  };
};

export const useStatusCheck = () => {
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkStatus = useCallback(async (id: string) => {
    setIsChecking(true);
    setError(null);

    try {
      const response = await getStatus(id);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setIsChecking(false);
    }
  }, []);

  return {
    checkStatus,
    isChecking,
    error,
  };
};
