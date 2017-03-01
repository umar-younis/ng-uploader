import { NgUploaderOptions } from './ng-models';

export interface NgUploaderInterface {
  setOptions(options: NgUploaderOptions);
  addFile(file: any, options?: NgUploaderOptions);
  addFiles(file: any[], options?: NgUploaderOptions);
  removeFile(index: number);
  uploadAll();
  uploadOne(index: number);
  uploadFile(file: any, options?: NgUploaderOptions);
  clearQueue();
  notifier();
}
