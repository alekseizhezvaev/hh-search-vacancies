import React, { useEffect, useState } from 'react';

import { Grid, makeStyles, Typography } from '@material-ui/core';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import { Vacancy as VacancyType } from 'src/common/types';
import { Layout } from 'src/common/Layout';
import { Ymap } from 'src/common/Ymap';
import { ErrorPage } from 'src/ErrorPage';

const useStyles = makeStyles(() => ({
  skill: {
    padding: '10px',
    color: '#000',
    backgroundColor: '#eee',
    margin: '4px',
    cursor: 'default',
  },

  publishedAt: {
    fontStyle: 'italic',
  },

  mapWrapper: {
    position: 'relative',
    height: '224px',
  },

  map: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },
}));

const getReadTime = (timestamp: string) => {
  const date = new Date(timestamp);

  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  return date.toLocaleString('ru', options);
};

export const Vacancy: React.FC = () => {
  const classes = useStyles();
  const router = useRouter();
  const [vacancyObject, setVacancyObject] = useState<VacancyType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const vacancyIdQuery =
    (Array.isArray(router?.query?.vacancyLinkId)
      ? router?.query?.vacancyLinkId?.[0]
      : router?.query?.vacancyLinkId) || '';

  const fetchVacancy = async (queryText: string) => {
    try {
      const response = await axios.get(`https://api.hh.ru/vacancies/${queryText}`, {
        headers: { 'User-Agent': 'api-test-agent' },
      });

      setVacancyObject(response.data);
    } catch (error) {
      console.error(error);
      router.push('/404');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!vacancyIdQuery) {
      return;
    }

    fetchVacancy(vacancyIdQuery);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vacancyIdQuery]);

  const createMarkup = () => {
    if (!vacancyObject?.description) {
      return;
    }

    return { __html: vacancyObject?.description };
  };

  if (isLoading || !vacancyObject) {
    return (
      <Layout maxWidth="xs">
        <Typography align="center" component="h2" variant="h5">
          Загрузка...
        </Typography>
      </Layout>
    );
  }

  return (
    <Layout>
      <Grid container spacing={3}>
        <Grid container item spacing={3}>
          <Grid item container>
            <Typography component="h1" variant="h4">
              {vacancyObject?.name}
            </Typography>
          </Grid>

          {vacancyObject?.salary ? (
            <Grid item>
              <Typography component="h2" variant="h5">
                {vacancyObject.salary.from ? `от ${vacancyObject.salary.from}` : ''}
                {vacancyObject.salary.to ? ` до ${vacancyObject.salary.to}` : ''}

                {vacancyObject.salary.currency === 'RUR'
                  ? ' руб.'
                  : ` ${vacancyObject.salary.currency}`}
              </Typography>
            </Grid>
          ) : (
            'з/п не указана'
          )}
        </Grid>

        <Grid container item justify="space-between">
          <Grid item>
            {vacancyObject?.employer?.name ? (
              <Typography component="h2" variant="h5">
                {vacancyObject.employer.name}
              </Typography>
            ) : null}

            {vacancyObject?.address?.raw ? (
              <Typography component="h3" variant="subtitle1">
                {vacancyObject.address.raw}
              </Typography>
            ) : null}
          </Grid>

          {vacancyObject?.employer?.logo_urls?.['240'] ? (
            <Grid item>
              <img alt="employer logo" src={vacancyObject.employer.logo_urls['240']} />
            </Grid>
          ) : null}
        </Grid>

        <Grid container item spacing={1}>
          {vacancyObject?.experience ? (
            <Grid container item>
              Требуемый опыт работы: {vacancyObject.experience.name}
            </Grid>
          ) : null}

          {vacancyObject?.employment ? (
            <Grid container item>
              {vacancyObject.employment.name}
            </Grid>
          ) : null}
        </Grid>

        <Grid container item>
          <div dangerouslySetInnerHTML={createMarkup()} />
        </Grid>

        {vacancyObject?.key_skills && vacancyObject?.key_skills.length > 0 ? (
          <Grid container item spacing={2}>
            <Grid container item>
              <Typography component="h3" variant="h5">
                Ключевые навыки
              </Typography>
            </Grid>

            <Grid container item>
              {vacancyObject?.key_skills.map((skill, id) => (
                <Grid key={skill.name + id} className={classes.skill} item>
                  {skill.name}
                </Grid>
              ))}
            </Grid>
          </Grid>
        ) : null}

        {vacancyObject?.address ? (
          <Grid container item spacing={1}>
            <Grid container item>
              <Typography component="h3" variant="h5">
                Адрес
              </Typography>
            </Grid>

            {vacancyObject?.address?.raw ? (
              <Grid container item>
                {vacancyObject?.address?.raw}
              </Grid>
            ) : null}

            {vacancyObject?.address?.lat && vacancyObject?.address?.lng ? (
              <Grid className={classes.mapWrapper} container item>
                <Ymap
                  className={classes.map}
                  lng={vacancyObject?.address?.lng}
                  lat={vacancyObject?.address?.lat}
                />
              </Grid>
            ) : null}
          </Grid>
        ) : null}

        {vacancyObject?.published_at ? (
          <Grid className={classes.publishedAt} container item>
            Вакансия опубликована {getReadTime(vacancyObject?.published_at)}
          </Grid>
        ) : null}
      </Grid>
    </Layout>
  );
};
