import { FetchStatuses, File } from '../common/commonInterfaces';

export interface FilesListState {
  files: File[] | null;
  status: FetchStatuses;
}

