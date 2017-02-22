import { Ng2UploaderOptions } from './ng2-uploader.options';
export class QueueItem {
  file: any;
  options: Ng2UploaderOptions;
  progress: number;
  status: number;
  response: any;

  constructor(file: any, options: Ng2UploaderOptions, progress: number, status?: number, response?: any) {
    this.file = file;
    this.options = options;
    this.progress = progress;
    this.status = status;
    this.response = response;
  }
}
