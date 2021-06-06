import React, { Dispatch, SetStateAction } from 'react';

import { Checkbox, FormControlLabel, FormGroup, Grid, Typography } from '@material-ui/core';

type Props = {
  list: { id: string; name: string }[];
  state: string[];
  title: string;
  setState: Dispatch<SetStateAction<string[]>>;
};

export const CheckboxGroup: React.FC<Props> = ({ list, title, state, setState }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.name;

    setState((prev) => {
      const index = prev.indexOf(id);

      if (index > -1) {
        return prev.filter((item) => item !== id);
      }

      return [...prev, id];
    });
  };

  return (
    <Grid container>
      <Grid item container>
        <Typography component="h5" variant="h6">
          {title}
        </Typography>
      </Grid>

      <Grid item container>
        <FormGroup row>
          {list.map((item) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={Boolean(state.find((checked) => checked === item.id))}
                  onChange={handleChange}
                  name={item.id}
                  color="primary"
                />
              }
              label={item.name}
              key={item.id}
            />
          ))}
        </FormGroup>
      </Grid>
    </Grid>
  );
};
