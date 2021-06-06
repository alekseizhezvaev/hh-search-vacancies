import React, { Fragment, useEffect } from 'react';

import { Box, CssBaseline } from '@material-ui/core';
import 'fontsource-roboto';
import { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Поиск вакансий</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <CssBaseline />
      <Box fontSize={16}>
        <Component {...pageProps} />
      </Box>
    </Fragment>
  );
}

// eslint-disable-next-line import/no-default-export
export default MyApp;
