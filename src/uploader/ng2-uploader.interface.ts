import { Ng2UploaderOptions } from './ng2-models';

export interface Ng2UploaderInterface {
  setOptions(options: Ng2UploaderOptions);
  addFile(file: any, options?: Ng2UploaderOptions);
  addFiles(file: any[], options?: Ng2UploaderOptions);
  removeFile(index: number);
  uploadAll();
  uploadOne(index: number);
  uploadFile(file: any, options?: Ng2UploaderOptions);
  clearQueue();
  notifier();
}
