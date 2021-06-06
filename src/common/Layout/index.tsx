import React, { ReactChild, ReactFragment, ReactPortal } from 'react';

import { Container, makeStyles } from '@material-ui/core';

type Props = {
  children: boolean | ReactChild | ReactFragment | ReactPortal;
  maxWidth?: false | 'md' | 'xs' | 'sm' | 'lg' | 'xl' | undefined;
};

const useStyles = makeStyles(() => ({
  container: {
    paddingTop: '100px',
    paddingBottom: '100px',
  },
}));

export const Layout: React.FC<Props> = ({ children, maxWidth }) => {
  const classes = useStyles();

  return (
    <Container className={classes.container} component="main" maxWidth={maxWidth || 'md'}>
      {children}
    </Container>
  );
};
