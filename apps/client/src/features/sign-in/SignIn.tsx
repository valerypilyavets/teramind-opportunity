import React from 'react';
import Typography from '@mui/material/Typography';
import { SignInPayload } from './signInInterfaces';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectStatus, selectIsAuthorised, signInThunk } from './signInSlice';
import { FetchStatuses } from '../common/commonInterfaces';
import { FormError } from '../common/components/FormError';
import { SignInForm } from './components/SignInForm';
import { Navigate } from 'react-router-dom';

export function SignIn() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const isAuthorised = useAppSelector(selectIsAuthorised);

  const handleSubmit = (values: SignInPayload) => {
    dispatch(signInThunk(values));
  };

  return (
    <>
      {isAuthorised && <Navigate to='/' />}
      <Typography component='h1' variant='h5' gutterBottom={true}>
        Sign in
      </Typography>
      {status === FetchStatuses.FAILED && <FormError />}
      {status !== FetchStatuses.SUCCEDED &&
        <SignInForm disabled={status === FetchStatuses.PENDING} submitCallback={handleSubmit} />}
    </>
  );
}

