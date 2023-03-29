import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export function UploadError() {
  return (
    <Alert severity='error'>
      <AlertTitle>Something went wrong while uploading your file</AlertTitle>
      Maybe size is more than 5Mb. Please try one more time.
    </Alert>
  );
}