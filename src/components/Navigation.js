import { React } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

export default function Navigation({ title }) {
    return (
      <AppBar>
        <Toolbar>
          <Typography variant="h6">{title}</Typography>
        </Toolbar>
      </AppBar>
    );
  }