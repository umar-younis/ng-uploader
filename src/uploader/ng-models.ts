export class NgUploaderOptions {
  type?: 'POST' | 'PATCH';
  url: string;
  headers: Object;
  params: Object;
  convertToJson?: boolean;
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
  data?: any;
};

export class Progress {
  index: number;
  progress: number;
}
