import { useState, useEffect } from 'react';

export function useAsync<T>(asyncFunction: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const execute = async () => {
      try {
        const result = await asyncFunction();
        if (isMounted) setData(result);
      } catch (err) {
        if (isMounted) setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    execute();

    return () => {
      isMounted = false;
    };
  }, [asyncFunction]);

  return { data, loading, error };
}
