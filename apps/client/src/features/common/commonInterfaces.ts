export interface FormSubmitCallback<T> {
  (values: T): void
}

export interface FormProps<T> {
  submitCallback: FormSubmitCallback<T>
  disabled: boolean
}

export interface AuthErrors {
  firstName?: string
  lastName?: string
  email?: string;
  password?: string;
  passwordConfirmation?: string;
}

export enum ValidationMessages {
  REQUIRED_FIELD = 'This field is required',
  INVALID_EMAIL = 'Email address should be valid',
  CONFIRMATION_PASSWORD_UNMATCH = 'Passwords do not match',
}

export enum FetchStatuses {
  IDLE = 'idle',
  PENDING = 'pending',
  SUCCEDED = 'succeeded',
  FAILED = 'failed',
}

export interface File {
  id: number;
  userId: number;
  originalname: string;
  destination: string;
  encoding: string;
  fieldname: string;
  mimetype: string;
  size: string;
  path: string;
  type: string
}