import { Ng2UploaderOptions } from './ng2-uploader.options';
export class QueueItem {
  file: any;
  options: Ng2UploaderOptions;
  progress: number;

  constructor(file: any, options: Ng2UploaderOptions, progress: number) {
    this.file = file;
    this.options = options;
    this.progress = progress;
  }
}