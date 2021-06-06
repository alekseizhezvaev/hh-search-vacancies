import React, { useEffect, useState } from 'react';

import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { useRouter } from 'next/dist/client/router';
import { CheckboxGroup } from 'src/common/CheckboxGroup';

type Props = {
  fetchVacancies: (queryText: string) => Promise<void>;
  isFetchLoading: boolean;
};

const employments = [
  { id: 'full', name: 'Полная занятость' },
  { id: 'part', name: 'Частичная занятость' },
  { id: 'project', name: 'Проектная работа' },
  { id: 'volunteer', name: 'Волонтерство' },
  { id: 'probation', name: 'Стажировка' },
];

const schedulates = [
  { id: 'fullDay', name: 'Полный день' },
  { id: 'shift', name: 'Сменный график' },
  { id: 'flexible', name: 'Гибкий график' },
  { id: 'remote', name: 'Удаленная работа' },
  { id: 'flyInFlyOut', name: 'Вахтовый метод' },
];

export const Search: React.FC<Props> = ({ fetchVacancies, isFetchLoading }) => {
  const [searchText, setSearchText] = useState('');
  const [changeEmployments, setChangeEmployments] = useState<Array<string>>([]);
  const [changeSchedules, setChangeSchedules] = useState<Array<string>>([]);
  const router = useRouter();

  const searchQuery = Array.isArray(router.query?.search)
    ? router.query?.search[0]
    : router.query?.search;

  const employmentQuery = router.query?.employment;
  const scheduleQuery = router.query?.schedule;

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleClick = () => {
    const query =
      searchText +
      (Boolean(changeEmployments.length)
        ? `&employment=${changeEmployments.join('&employment=')}`
        : '') +
      (Boolean(changeSchedules.length) ? `&schedule=${changeSchedules.join('&schedule=')}` : '');

    fetchVacancies(query);
  };

  useEffect(() => {
    setSearchText(searchQuery || '');

    if (Array.isArray(employmentQuery)) {
      setChangeEmployments([...employmentQuery]);
    } else if (typeof employmentQuery === 'string') {
      setChangeEmployments([employmentQuery]);
    }

    if (Array.isArray(scheduleQuery)) {
      setChangeSchedules([...scheduleQuery]);
    } else if (typeof scheduleQuery === 'string') {
      setChangeSchedules([scheduleQuery]);
    }
  }, [employmentQuery, scheduleQuery, searchQuery]);

  return (
    <Grid container spacing={2}>
      <Grid container item>
        <Typography component="h1" variant="h5">
          Поиск вакансий
        </Typography>

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Введите название вакансии"
          name="search"
          autoFocus
          value={searchText}
          onChange={handleChangeSearch}
        />
      </Grid>

      <Grid container item spacing={1}>
        <Grid item>
          <CheckboxGroup
            state={changeEmployments}
            setState={setChangeEmployments}
            list={employments}
            title="Тип занятости"
          />
        </Grid>

        <Grid item>
          <CheckboxGroup
            state={changeSchedules}
            setState={setChangeSchedules}
            list={schedulates}
            title="График работы"
          />
        </Grid>
      </Grid>

      <Grid container item>
        <Button
          disabled={!searchText || isFetchLoading}
          type="button"
          variant="contained"
          color="primary"
          onClick={handleClick}
        >
          Найти
        </Button>
      </Grid>
    </Grid>
  );
};
