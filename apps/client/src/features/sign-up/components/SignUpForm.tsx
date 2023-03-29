import { SignUpPayload } from '../signUpInterfaces';
import { FormProps, ValidationMessages, AuthErrors } from '../../common/commonInterfaces';
import { useFormik } from 'formik';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import React from 'react';

export function SignUpForm(props: FormProps<SignUpPayload>) {
  const { submitCallback, disabled } = props;
  const validate = (values: SignUpPayload) => {
    const errors: AuthErrors = {};
    if (!values.firstName) {
      errors.firstName = ValidationMessages.REQUIRED_FIELD;
    }
    if (!values.lastName) {
      errors.lastName = ValidationMessages.REQUIRED_FIELD;
    }
    if (!values.email) {
      errors.email = ValidationMessages.REQUIRED_FIELD;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = ValidationMessages.INVALID_EMAIL;
    }
    if (!values.password) {
      errors.password = ValidationMessages.REQUIRED_FIELD;
    }
    if (!values.passwordConfirmation) {
      errors.passwordConfirmation = ValidationMessages.REQUIRED_FIELD;
    } else if (values.passwordConfirmation !== values.password) {
      errors.passwordConfirmation = ValidationMessages.CONFIRMATION_PASSWORD_UNMATCH;
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
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
        id='firstName'
        label='First Name'
        name='firstName'
        disabled={disabled}
        onChange={formik.handleChange}
        value={formik.values.firstName}
        error={!!formik.errors.firstName}
        helperText={!!formik.errors.firstName ? formik.errors.firstName : ''}
      />
      <TextField
        margin='normal'
        required
        fullWidth
        id='lastName'
        label='Last Name'
        name='lastName'
        disabled={disabled}
        onChange={formik.handleChange}
        value={formik.values.lastName}
        error={!!formik.errors.lastName}
        helperText={!!formik.errors.lastName ? formik.errors.lastName : ''}
      />
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
        helperText={!!formik.errors.password ? formik.errors.password : ''}
      />
      <TextField
        margin='normal'
        required
        fullWidth
        name='passwordConfirmation'
        label='Password Confirmation'
        type='password'
        id='passwordConfirmation'
        disabled={disabled}
        onChange={formik.handleChange}
        value={formik.values.passwordConfirmation}
        error={!!formik.errors.passwordConfirmation}
        helperText={!!formik.errors.passwordConfirmation ? formik.errors.passwordConfirmation : ''}
      />
      <Button
        type='submit'
        fullWidth
        variant='contained'
        disabled={disabled}
        sx={{ mt: 3, mb: 2 }}
      >
        Sign Up
      </Button>
      <Grid container>
        <Grid item>
          <Typography variant='body2'>Already have an account?&nbsp;
            <Link href='/sign-in' variant='body2'>Sign In</Link>
          </Typography>
        </Grid>
      </Grid>
    </Box>

  );
}