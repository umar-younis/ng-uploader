import { Injectable } from '@angular/core';
import { NgUploaderOptions, QueueItem, UploadResponse, Progress } from './ng-models';
import { NgUploaderInterface } from './ng-uploader.interface';
import { Observable, Subject, Subscription } from 'rxjs';
import { Response, ResponseOptions } from "@angular/http";

@Injectable()
export class NgUploader implements NgUploaderInterface {
  queue: QueueItem[] = [];
  private options: NgUploaderOptions;
  private tempQueue: QueueItem[] = [];
  private _interveller: any;
  private currentUpload: number;
  private allUploadFlag: boolean;
  private xhr: XMLHttpRequest;
  private uploadSource: Subject<UploadResponse>;
  private progressSource: Subject<Progress>;
  constructor() {
    this.options = {
      url: '',
      headers: {},
      params: {},
      convertToJson: false
    };
    this.uploadSource = new Subject<UploadResponse>();
    this.progressSource = new Subject<Progress>();
  }

  addFile(file: File, options?: NgUploaderOptions): void {
    this.queue.push({
      file: file,
      options: this.setFileOptions(options)
    });
    this.configurePrototypes();
    this.extractDataURLs();
  }

  addFiles(files: File[], options?: NgUploaderOptions): void {
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
    this.cancelUpload();
    this.currentUpload = undefined;
    this.queue = [];
  }

  removeFile(index: number): void {
    if (this.currentUpload === index) {
      this.cancelUpload();
    }
    if (this.queue[index]) this.queue.splice(index, 1);
    if (this.currentUpload >= 0 && this.allUploadFlag) {
      this.uploadAll();
    }
    this.configurePrototypes();
  }

  setOptions(options: NgUploaderOptions): void {
    this.options = options;
  }

  uploadAll(): void {
    if (this.queue.length > 0) {
      this.allUploadFlag = true;
      this.uploadQueue(0, true);
    }
  }

  uploadOne(index: number): void {
    if (this.queue[index]) {
      this.uploadQueue(index, false, false);
    }
  }

  onProgress(): Observable<Progress> {
    return this.progressSource.asObservable();
  }

  uploadFile(file: any, options?: NgUploaderOptions): void {
    this.tempQueue = this.queue;
    this.queue = [];
    this.queue.push({
      file: file,
      options: this.setFileOptions(options)
    });
    this.uploadQueue(0, false, true);
  }

  notifier(): Observable<UploadResponse> {
    return this.uploadSource.asObservable();
  }

  private uploadQueue(index: number, allFlag: boolean, resetQ?: boolean): void {
    const vm = this;
    if (vm.queue[index]) {
      if (vm.queue[index].isUploading) {
        return null;
      }
      const formData: FormData = new FormData();
      this.xhr = new XMLHttpRequest();
      this.xhr.open(vm.queue[index].options.type || 'POST', vm.queue[index].options.url, true);
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
          if (!vm.queue[index]) return;
          if (this.xhr.status === 0) {
            if ((allFlag) && (vm.queue[index + 1])) {
              vm.uploadAll();
            } else {
              this.uploadSource.next({
                isAllUploaded: true
              });
            }
            return;
          }
          const response: any = this.getParsedResponse(vm.queue[index].options.convertToJson);
          this.currentUpload = undefined;
          this.uploadSource.next({
            index: index,
            filename: vm.queue[index].file.name,
            status: this.xhr.status,
            response: response,
            isAllUploaded: vm.queue[index + 1] ? false : true
          });
          this.clearInterveller();
          if (resetQ) {
            vm.queue = vm.tempQueue;
            vm.tempQueue = [];
          }
          if (vm.queue[index]) {
            vm.queue[index].response = response;
            vm.queue[index].status = 1;
            if ((allFlag) && (vm.queue[index + 1])) {
              vm.uploadQueue(index + 1, allFlag, resetQ);
            }
          }
        }
      };

      this.xhr.upload.onprogress = (event) => {
        if (vm.queue[index]) {
          vm.queue[index].progress = Math.round(event.loaded / event.total * 100);
          this.progressSource.next({
            index: index,
            progress: vm.queue[index].progress
          });
        }
      };
      if (vm.queue[index]) {
        vm.queue[index].isUploading = true;
      }
      this.currentUpload = index;
      vm.interveller();
      this.xhr.send(formData);
    }
  }

  private cancelUpload(): void {
    if (this.currentUpload >= 0) {
      this.xhr.abort();
    }
  }

  private setFileOptions(options: NgUploaderOptions): NgUploaderOptions {
    const opt: NgUploaderOptions = this.options || options;
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

  private getParsedResponse(convertToJson: boolean): any {
    if (convertToJson) {
      let res: Response = new Response(new ResponseOptions({
        body: this.xhr.response,
        status: this.xhr.status
      }));
      return res.json();
    } else {
      return this.xhr.response;
    }
  }

  private interveller(): void {
    this._interveller = setInterval(() => { }, 10);
  }

  private clearInterveller(): void {
    clearInterval(this._interveller);
  }
}
