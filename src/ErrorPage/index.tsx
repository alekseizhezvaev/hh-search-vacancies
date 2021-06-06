import React from 'react';

import { Grid, Link, makeStyles, Typography } from '@material-ui/core';
import NextLink from 'next/link';
import { Layout } from 'src/common/Layout';

const useStyles = makeStyles(() => ({
  link: {
    cursor: 'pointer',
  },
}));

export const ErrorPage: React.FC = () => {
  const classes = useStyles();

  return (
    <Layout maxWidth="sm">
      <Grid container spacing={2}>
        <Grid container item>
          <Typography component="h2" variant="h4">
            Ошибка 404
          </Typography>
        </Grid>

        <Grid container item>
          <Typography component="h2" variant="subtitle1">
            Что-то пошло не так. Возможно, вы ошиблись, набирая адрес в строке браузера — так
            бывает. Если вы уверены, что адрес набран верно, то страница, скорее всего, была удалена
            и ее больше нет.
          </Typography>
        </Grid>

        <Grid container item>
          <NextLink href="/">
            <Link>
              <Typography className={classes.link} component="h2" variant="subtitle1">
                Вернуться на главную
              </Typography>
            </Link>
          </NextLink>
        </Grid>
      </Grid>
    </Layout>
  );
};
