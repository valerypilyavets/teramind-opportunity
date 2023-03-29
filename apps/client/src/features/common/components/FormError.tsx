import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export function FormError() {
  return (
    <Alert severity='error'>
      <AlertTitle>Error</AlertTitle>
      Something went wrong while proceeding you request.
      Please check the date you've entered.
    </Alert>
  );
}