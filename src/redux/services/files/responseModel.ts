export interface IUploadFileToStorageResponse {
  created_at: string;
  id: string;
  mime_type: string;
  original_filename: string;
  path: string;
  size: number;
  url: string;
}

export interface IStorage {
  id: string
}

export interface IGetStoragesResponse {
  storages: IStorage[]
}
