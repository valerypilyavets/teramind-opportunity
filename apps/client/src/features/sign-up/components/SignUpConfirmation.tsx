import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Link from '@mui/material/Link';
import { SingUpConfirmationProps } from '../signUpInterfaces';

export function SignUpConfirmation(props: SingUpConfirmationProps) {
  const { registeredUser } = props;
  return (
    <Alert severity='success'>
      <AlertTitle>{registeredUser.firstName}, you are successfully registered!</AlertTitle>
      Please proceed to <Link href='/sign-in'>Sign In</Link> or update page to register new user
    </Alert>
  );
}