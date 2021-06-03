import React, { useState } from 'react';

import {
  Button,
  Container,
  CssBaseline,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { useRouter } from 'next/dist/client/router';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
  },
  button: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const Search = () => {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handeClick = () => {
    setInputValue('');
    router.push(`/vacancies?search=${inputValue.toLowerCase()}`);
  };

  return (
    <Container className={classes.container} component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Введите вакансию
        </Typography>

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="search"
          label="Введите название вакансии"
          name="search"
          autoComplete="search"
          autoFocus
          value={inputValue}
          onChange={handleChange}
        />

        <Button
          disabled={!inputValue}
          type="button"
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handeClick}
        >
          Поиск
        </Button>
      </div>
    </Container>
  );
};
