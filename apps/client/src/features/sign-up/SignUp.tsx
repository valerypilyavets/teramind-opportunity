import React from 'react';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { signUpThunk } from './signUpSlice';
import { selectStatus, selectUser } from './signUpSlice';
import { FetchStatuses } from '../common/commonInterfaces';
import { SignUpPayload } from './signUpInterfaces';
import { SignUpForm } from './components/SignUpForm';
import { SignUpConfirmation } from './components/SignUpConfirmation';
import { FormError } from '../common/components/FormError';
import { Navigate } from 'react-router-dom';
import { selectIsAuthorised } from '../sign-in/signInSlice';

export function SignUp() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const user = useAppSelector(selectUser);
  const isAuthorised = useAppSelector(selectIsAuthorised);

  const handleSubmit = (values: SignUpPayload) => {
    dispatch(signUpThunk(values));
  };

  return (
    <>
      {isAuthorised && <Navigate to='/' replace />}
      <Typography component='h1' variant='h5' gutterBottom={true}>
        Sign up
      </Typography>
      {status === FetchStatuses.FAILED && <FormError />}
      {status !== FetchStatuses.SUCCEDED &&
        <SignUpForm disabled={status === FetchStatuses.PENDING} submitCallback={handleSubmit} />}
      {status === FetchStatuses.SUCCEDED && user && <SignUpConfirmation registeredUser={user} />}
    </>
  );
}
