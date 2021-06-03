import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { useRouter } from 'next/dist/client/router';

export const ListVacancies: React.FC = () => {
  // TODO: Type array listItems
  const [listItems, setListItems] = useState<string[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchQuery =
    (Array.isArray(router?.query?.search) ? router?.query?.search?.[0] : router?.query?.search) || '';

  const fetchVacancies = async (queryText: string) => {
    console.log('fetch');
    try {
      const response = await axios.get(`https://api.hh.ru/vacancies?text=${queryText}`, {
        headers: { 'User-Agent': 'api-test-agent' },
      });

      setListItems((prev) => [...prev, ...response.data.items]);
    } catch (error) {
      console.log(error);
      setIsError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    setListItems([]);
    fetchVacancies(searchQuery);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  console.log(listItems);

  return <div>ListVacancies</div>;
};
