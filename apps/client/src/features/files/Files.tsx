import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  selectIsAuthorised,
} from '../sign-in/signInSlice';
import { Navigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import FolderIcon from '@mui/icons-material/Folder';
import { filesListThunk, selectFiles } from './filesSlice';

export function Files() {
  const isAuthorized = useAppSelector(selectIsAuthorised);
  const dispatch = useAppDispatch();
  const files = useAppSelector(selectFiles);

  useEffect(() => {
    dispatch(filesListThunk());
  });

  return (
    <>
      {!isAuthorized && <Navigate to='/' />}

      <Typography component='h1' variant='h5' gutterBottom={true}>
        Uploaded files
      </Typography>
      <List>
        {files && files.map(file => (
          <ListItem key={file.id}>
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>
            <ListItemText
              primary={file.originalname}
              secondary={file.path}
            />
          </ListItem>
        ))}
        {!files && <Typography>'No files uploaded'</Typography>}
      </List>
    </>
  );
}
