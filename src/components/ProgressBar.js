import * as React from 'react';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

export default function LinearColor() {
  return (
    <Stack sx={{ width: '100%' }} position="fixed">
      <LinearProgress color="inherit" />
    </Stack>
  );
}
