import { useState, useEffect } from 'react';
import { Company } from '../types/company';
import { searchCompanies } from '../services/companyService';

export const useCompanySearch = (query: string) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (query.length < 2) {
        setCompanies([]);
        setError(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const results = await searchCompanies(query);
        setCompanies(results);
      } catch (err) {
        setError('Impossible de récupérer les suggestions. Veuillez réessayer.');
        setCompanies([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [query]);

  return { companies, isLoading, error };
};