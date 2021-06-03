import React from 'react';

import 'fontsource-roboto';
import { AppProps } from 'next/app';
import { ContextProvider } from 'src/Context';

// import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  );
}

// eslint-disable-next-line import/no-default-export
export default MyApp;
