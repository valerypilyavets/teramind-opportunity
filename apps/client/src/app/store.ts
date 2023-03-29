import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import signUpReducer from '../features/sign-up/signUpSlice';
import signInReducer from '../features/sign-in/signInSlice';
import filesReducer from '../features/files/filesSlice';
import uploadReducer from '../features/upload/uploadSlice';
import usersReducer from '../features/users/usersSlice';

export const store = configureStore({
  reducer: {
    signIn: signInReducer,
    signUp: signUpReducer,
    users: usersReducer,
    files: filesReducer,
    upload: uploadReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
