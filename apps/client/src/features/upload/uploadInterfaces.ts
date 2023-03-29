import { FetchStatuses, File } from '../common/commonInterfaces';

export interface UploadConfirmationProps {
  name: string;
}

export interface UploadState {
  file: File | null;
  status: FetchStatuses;
}