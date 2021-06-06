import React, { useEffect, useState } from 'react';

import { Grid, Typography } from '@material-ui/core';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import { Vacancy as VacancyType } from 'src/common/types';
import { Layout } from 'src/common/Layout';

import { Search } from './Search';
import { VacancyLink } from './VacancyLink';

export const ListVacancies: React.FC = () => {
  const [listItems, setListItems] = useState<Array<VacancyType>>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const query = router.asPath.split('/?search=')[1];

  const fetchVacancies = async (queryText: string) => {
    try {
      const response = await axios.get(`https://api.hh.ru/vacancies?text=${queryText}`, {
        headers: { 'User-Agent': 'api-test-agent' },
      });

      setListItems(response.data.items);
      router.push(`/?search=${queryText}`);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!query) {
      return;
    }

    fetchVacancies(router.asPath.split('/?search=')[1]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <Grid container spacing={5}>
        <Grid container item>
          <Search fetchVacancies={fetchVacancies} isFetchLoading={isLoading} />
        </Grid>

        <Grid container item>
          {isLoading ? (
            <Typography align="center" component="h2" variant="h5">
              Загрузка...
            </Typography>
          ) : null}

          {!isLoading ? (
            <Grid container spacing={2}>
              {isError || (!Boolean(listItems.length) && query) ? (
                <Grid container item justify="center">
                  <Typography component="h5" variant="h6">
                    Ничего не найдено
                  </Typography>
                </Grid>
              ) : null}

              {listItems.map((item, index) => (
                <Grid container item key={item.id + index}>
                  <VacancyLink {...item} />
                </Grid>
              ))}
            </Grid>
          ) : null}
        </Grid>
      </Grid>
    </Layout>
  );
};
