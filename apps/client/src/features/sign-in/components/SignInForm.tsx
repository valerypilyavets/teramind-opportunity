import { AuthErrors, FormProps, ValidationMessages } from '../../common/commonInterfaces';
import { SignInPayload } from '../signInInterfaces';

import { useFormik } from 'formik';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import React from 'react';

export function SignInForm(props: FormProps<SignInPayload>) {
  const { submitCallback, disabled } = props;
  const validate = (values: SignInPayload) => {
    const errors: AuthErrors = {};
    if (!values.email) {
      errors.email = ValidationMessages.REQUIRED_FIELD;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = ValidationMessages.INVALID_EMAIL;
    }
    if (!values.password) {
      errors.password = ValidationMessages.REQUIRED_FIELD;
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: values => {
      submitCallback(values);
    },
  });

  return (
    <Box component='form' onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin='normal'
        required
        fullWidth
        id='email'
        label='Email Address'
        name='email'
        disabled={disabled}
        onChange={formik.handleChange}
        value={formik.values.email}
        error={!!formik.errors.email}
        helperText={!!formik.errors.email ? formik.errors.email : ''}
        autoFocus
      />
      <TextField
        margin='normal'
        required
        fullWidth
        name='password'
        label='Password'
        type='password'
        id='password'
        disabled={disabled}
        onChange={formik.handleChange}
        value={formik.values.password}
        error={!!formik.errors.password}
        helperText={!!formik.errors.email ? formik.errors.password : ''}
      />
      <Button
        type='submit'
        disabled={disabled}
        fullWidth
        variant='contained'
        sx={{ mt: 3, mb: 2 }}
      >
        Sign In
      </Button>
      <Grid container>
        <Grid item>
          <Typography variant='body2'>Don't have an account?&nbsp;
            <Link href='/sign-up' variant='body2'>Sign Up</Link>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}