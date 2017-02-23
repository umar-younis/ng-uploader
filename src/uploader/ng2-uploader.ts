import { Injectable } from '@angular/core';
import { Ng2UploaderOptions, QueueItem, UploadResponse } from './ng2-models';
import { Ng2UploaderInterface } from './ng2-uploader.interface';
import { Observable, Subject, Subscription } from 'rxjs';

@Injectable()
export class Ng2Uploader implements Ng2UploaderInterface {
  queue: QueueItem[] = [];
  private options: Ng2UploaderOptions;
  progress: number = 0;
  private tempQueue: QueueItem[] = [];
  private subscriber: Subscription;
  private _interveller: any;
  private currentUpload: number;
  private allUploadFlag: boolean;
  private xhr: XMLHttpRequest;
  onUploadComplete: Observable<UploadResponse>;
  private uploadSource: Subject<UploadResponse>;
  constructor() {
    this.options = {
      url: '',
      headers: {},
      params: {}
    };
    this.uploadSource = new Subject<UploadResponse>();
    this.onUploadComplete = this.uploadSource.asObservable();
  }

  addFile(file: any, options?: Ng2UploaderOptions): void {
    this.queue.push({
      file: file,
      options: this.setFileOptions(options)
    });
    this.configurePrototypes();
    this.extractDataURLs();
  }

  addFiles(files: any[], options?: Ng2UploaderOptions): void {
    for (let i = 0; i < files.length; i++) {
      this.queue.push({
        file: files[i],
        options: this.setFileOptions(options)
      });
    }
    this.configurePrototypes();
    this.extractDataURLs();
  }

  clearQueue(): void {
    this.currentUpload = undefined;
    this.cancelSubscription();
    this.queue = [];
  }

  removeFile(index: number): void {
    if (this.currentUpload === index) {
      this.cancelSubscription();
    }
    if (this.queue[index]) {
      this.queue.splice(index, 1);
    }
    if (this.currentUpload >= 0 && this.allUploadFlag) {
      this.uploadAll();
    }
    this.configurePrototypes();
  }

  setOptions(options: Ng2UploaderOptions): void {
    this.options = options;
  }

  uploadAll(): void {
    if (this.queue.length > 0) {
      this.allUploadFlag = true;
      this.subscriber = this.uploadQueue(0, true).subscribe();
    }
  }

  uploadOne(index: number): void {
    if (this.queue[index]) {
      this.subscriber = this.uploadQueue(index, false, false).subscribe();
    }
  }

  uploadFile(file: any, options?: Ng2UploaderOptions): void {
    this.tempQueue = this.queue;
    this.queue = [];
    this.queue.push({
      file: file,
      options: this.setFileOptions(options)
    });
    this.subscriber = this.uploadQueue(0, false, true).subscribe();
  }

  private uploadQueue(index: number, allFlag: boolean, resetQ?: boolean): Observable<any> {
    const vm = this;
    vm.interveller();
    if (vm.queue[index]) {
      if (vm.queue[index].isUploading) {
        return Observable.of({});
      }
      return Observable.create(observer => {
        const formData: FormData = new FormData();
        this.xhr = new XMLHttpRequest();
        this.xhr.open('POST', vm.queue[index].options.url, true);
        formData.append('file', vm.queue[index].file);

        for (const key in vm.queue[index].options.params) {
          if (vm.queue[index].options.params[key]) {
            formData.append(key, vm.queue[index].options.params[key]);
          }
        }

        for (const key in vm.queue[index].options.headers) {
          if (vm.queue[index].options.headers[key]) {
            this.xhr.setRequestHeader(key, vm.queue[index].options.headers[key]);
          }
        }

        this.xhr.onreadystatechange = () => {
          if (this.xhr.readyState === 4) {
            if (this.xhr.status === 200) {
              this.clearInterveller();
              if (resetQ) {
                vm.queue = vm.tempQueue;
                vm.tempQueue = [];
              }
              vm.cancelSubscription();
              if (vm.queue[index]) {
                vm.queue[index].response = this.xhr.response;
                vm.queue[index].status = 1;
                if ((allFlag) && (vm.queue[index + 1])) {
                  vm.subscriber = vm.uploadQueue(index + 1, allFlag, resetQ).subscribe();
                } else {
                  observer.complete();
                }
              }
              this.currentUpload = undefined;
              this.uploadSource.next({
                index: index,
                filename: vm.queue[index].file.name,
                status: 1,
                response: this.xhr.response
              });
            } else {
              observer.error(this.xhr.response);
            }
          }
        };

        this.xhr.upload.onprogress = (event) => {
          if (vm.queue[index]) {
            vm.queue[index].progress = Math.round(event.loaded / event.total * 100);
            observer.next({
              progress: vm.queue[index].progress,
              file: vm.queue[index].file,
              index: index
            });
          }
        };
        vm.queue[index].isUploading = true;
        this.currentUpload = index;
        this.xhr.send(formData);
      });
    }
  }

  private cancelSubscription(): void {
    if (this.subscriber) {
      this.subscriber.unsubscribe();
      this.subscriber = undefined;
    }
    if (this.currentUpload >= 0) {
      this.xhr.abort();
    }
  }

  private setFileOptions(options: Ng2UploaderOptions): Ng2UploaderOptions {
    const opt: Ng2UploaderOptions = this.options || options;
    if (options) {
      return options;
    } else {
      return this.options;
    }
  }

  private configurePrototypes(): void {
    const vm = this;
    (this.queue || []).forEach((q, i) => {
      q.remove = () => { vm.removeFile(i); };
      q.start = () => { vm.uploadOne(i); };
    });
  }

  private extractDataURLs(): void {
    const validExts: any[] = ['jpg', 'jpeg', 'svg', 'png'];
    (this.queue || []).forEach((q, i) => {
      const name: any = q.file.name.split('.');
      if (validExts.indexOf(name[name.length - 1]) >= 0) {
        const reader: FileReader = new FileReader();
        reader.addEventListener('load', () => {
          q.preview = reader.result;
        });
        reader.readAsDataURL(q.file);
      }
    });
  }

  private interveller(): void {
    this._interveller = setInterval(() => { }, 10);
  }

  private clearInterveller(): void {
    clearInterval(this._interveller);
  }
}
