export class NgUploaderOptions {
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
  progress?: number;
};

export class QueueItem {
  file: any;
  options: NgUploaderOptions;
  progress?: number;
  status?: number;
  response?: any;
  isUploading?: boolean;
  preview?: any;
  remove?: Function;
  start?: Function;
};

export class Progress {
  index: number;
  progress: number;
}
