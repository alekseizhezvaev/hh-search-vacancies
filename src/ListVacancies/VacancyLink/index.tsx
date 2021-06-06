import React from 'react';

import { Grid, Link, makeStyles } from '@material-ui/core';
import NextLink from 'next/link';
import { Vacancy as VacancyType } from 'src/common/types';

const useStyles = makeStyles(() => ({
  wrapper: {
    border: '1px solid #ccc',
    padding: '16px',
  },

  name: {
    cursor: 'pointer',
  },

  info: {
    fontSize: '12px',
    color: '#4d4d4d',
  },
}));

type Props = VacancyType;

export const VacancyLink: React.FC<Props> = ({ name, employer, salary, id, address }) => {
  const classes = useStyles();
  return (
    <Grid className={classes.wrapper} container spacing={2}>
      <Grid container item justify="space-between">
        <Grid className={classes.name} item>
          <NextLink href={`/vacancy/${id}`}>
            <Link underline="hover" color="primary">
              {name}
            </Link>
          </NextLink>
        </Grid>

        {salary ? (
          <Grid item>
            {salary.from && !salary.to ? 'от ' : ''}
            {salary.from ? `${salary.from}` : ''}
            {salary.from && salary.to ? ' - ' : ''}
            {!salary.from && salary.to ? 'до ' : ''}
            {salary.to ? `${salary.to}` : ''}
            {salary.currency === 'RUR' ? ' руб.' : ' ' + salary.currency}
          </Grid>
        ) : (
          'з/п не указана'
        )}
      </Grid>

      <Grid className={classes.info} container item>
        {employer?.name ? (
          <Grid container item>
            {employer.name}
          </Grid>
        ) : null}

        {address?.city ? (
          <Grid container item>
            {address?.city}
          </Grid>
        ) : null}
      </Grid>
    </Grid>
  );
};
