import { Injectable } from '@angular/core';
import { Ng2UploaderOptions } from './ng2-uploader.options';
import { Ng2UploaderInterface } from './ng2-uploader.interface';
import { QueueItem } from './queue.item';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class Ng2Uploader implements Ng2UploaderInterface {
  queue: QueueItem[];
  options: Ng2UploaderOptions;
  progress: number;
  private tempQueue: QueueItem[];
  constructor(options?: Ng2UploaderOptions) {
    this.options = options;
  }

  addFile(file: any, options?: Ng2UploaderOptions): void {
    this.queue.push(new QueueItem(file, this.setFileOptions(options), 0, 0));
  }

  addFiles(files: any[], options?: Ng2UploaderOptions): void {
    for (let i = 0; i < files.length; i++) {
      this.queue.push(new QueueItem(files[i], this.setFileOptions(options), 0, 0));
    }
  }

  clearFiles(): void {
    this.queue = [];
  }

  removeFile(index: number): void {
    if (this.queue[index]) {
      this.queue.splice(index, 1);
    }
  }

  setOptions(options: Ng2UploaderOptions): void {
    this.options = options;
  }

  uploadAll(): void {
    if (this.queue.length > 0) {
      this.uploadQueue(0, true);
    }
  }

  uploadOne(index: number): void {
    if (this.queue[index]) {
      this.uploadQueue(index, false, false);
    } else {
      this.log(`Ng2Upload: Failed to uploadOne() provided index ${index} not exists`);
    }
  }

  uploadFile(file: any, options?: Ng2UploaderOptions): void {
    this.tempQueue = this.queue;
    this.queue = [];
    this.queue.push(new QueueItem(file, this.setFileOptions(options), 0, 0));
    this.uploadQueue(0, false, true);
  }

  private uploadQueue(index: number, allFlag: boolean, resetQ?: boolean): Observable<any> {
    if (this.queue[index]) {
      return Observable.create(observer => {
        const formData: FormData = new FormData();
        const xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open('POST', this.queue[index].options.url, true);
        formData.append('file', this.queue[index].file);

        for (const key in this.queue[index].options.params) {
          if (this.queue[index].options.params[key]) {
            formData.append(key, this.queue[index].options.params[key]);
          }
        }

        for (const key in this.queue[index].options.headers) {
          if (this.queue[index].options.headers[key]) {
            xhr.setRequestHeader(key, this.queue[index].options.headers[key]);
          }
        }

        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              if (resetQ) {
                this.queue = this.tempQueue;
                this.tempQueue = [];
              }
              this.queue[index].response = JSON.parse(xhr.response);
              if ((allFlag) && (this.queue[index + 1])) {
                this.uploadQueue(index + 1, allFlag, resetQ);
              } else {
                observer.complete();
              }
            } else {
              observer.error(xhr.response);
            }
          }
        };

        xhr.upload.onprogress = (event) => {
          this.queue[index].progress = Math.round(event.loaded / event.total * 100);
          observer.next(this.queue[index].progress);
        };
        xhr.send(formData);
      });
    }
  }

  private setFileOptions(options: Ng2UploaderOptions): Ng2UploaderOptions {
    const opt: Ng2UploaderOptions = this.options || options;
    if (opt) {
      return opt;
    } else {
      this.log('Please provide upload options before adding files');
      return new Ng2UploaderOptions('', {}, {});
    }
  }

  private log(msg: string): void {
    console.log('%c ' + msg, 'color: #f00, font-size: 24px');
  }
}
