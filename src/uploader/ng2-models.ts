export class Ng2UploaderOptions {
  url: string;
  headers: Object;
  params: Object;
};

export class UploadResponse {
  index?: number;
  filename?: string;
  status?: number;
  response?: any;
  isAllUploaded?: boolean;
};

export class QueueItem {
  file: any;
  options: Ng2UploaderOptions;
  progress?: number;
  status?: number;
  response?: any;
  isUploading?: boolean;
  preview?: any;
  remove?: Function;
  start?: Function;
};
