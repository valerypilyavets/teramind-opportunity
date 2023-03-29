import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Link from '@mui/material/Link';
import { UploadConfirmationProps } from '../uploadInterfaces';

export function UploadConfirmation(props: UploadConfirmationProps) {
  const { name } = props;
  return (
    <Alert severity='success'>
      <AlertTitle>File <strong>{name}</strong> successfully uploaded!</AlertTitle>
      Please proceed to <Link href='/files'>files list</Link> or upload more files
    </Alert>
  );
}