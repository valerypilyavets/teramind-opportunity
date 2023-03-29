import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  selectIsAuthorised,
} from '../sign-in/signInSlice';
import { Navigate } from 'react-router-dom';
import { DropzoneArea } from 'react-mui-dropzone';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import { selectFile, selectStatus, uploadFileThunk } from './uploadSlice';
import { UploadConfirmation } from './components/UploadConfirmation';
import { FetchStatuses } from '../common/commonInterfaces';
import { UploadError } from './components/UploadError';

export function Upload() {
  const isAuthorized = useAppSelector(selectIsAuthorised);
  const file = useAppSelector(selectFile);
  const status = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();

  const handleChange = (files: File[]) => {
    if (files[0]) {
      const formData = new FormData();
      formData.append('file', files[0]);

      dispatch(uploadFileThunk(formData));
    }
  };

  return (
    <>
      {!isAuthorized && <Navigate to='/sign-in' replace />}

      <Typography component='h1' variant='h5' gutterBottom={true}>
        Upload files
      </Typography>
      <DropzoneArea
        onChange={handleChange}
        showPreviewsInDropzone={false}
        filesLimit={1}
        showAlerts={false}
        maxFileSize={30000000}
      /><br />
      {status === FetchStatuses.SUCCEDED && file && <UploadConfirmation name={file.originalname} />}
      {status === FetchStatuses.FAILED && <UploadError />}
    </>
  );
}
