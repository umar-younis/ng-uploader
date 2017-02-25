import { Directive, ElementRef, Renderer, HostListener, Output, EventEmitter } from '@angular/core';
import { Ng2Uploader } from './ng2-uploader';

@Directive({
  selector: '[ng2UploadDrop]'
})
export class Ng2UploadDropDirective {
  el: ElementRef;
  private isUploadBotton: boolean = false;
  @Output() onFileOver: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onFileDrop: EventEmitter<File[]> = new EventEmitter<File[]>();
  constructor(el: ElementRef, private uploader: Ng2Uploader) {
    this.el = el;
  }

  @HostListener('drop', ['$event'])
  onDropHandler($event): void {
    alert("as");
    let transfer = this._getTransfer($event);
    if (!this._haveFiles(transfer.types)) {
      return;
    }

    this._preventAndStop($event);
    this.uploader.addFiles(transfer.files);
    this.onFileDrop.emit(transfer.files);
  }

  @HostListener('dragover', ['$event'])
  onDragOverHandler($event): void {
    const transfer = this._getTransfer(event);
    if (!this._haveFiles(transfer.types)) {
      return;
    }
    this.onFileOver.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  onDragOverLeave($event): void {
    this.onFileOver.emit(false);
  }

  private _preventAndStop(event:any):any {
    event.preventDefault();
    event.stopPropagation();
  }

  private _getTransfer(event:any):any {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _haveFiles(types:any):any {
    if (!types) {
      return false;
    }

    if (types.indexOf) {
      return types.indexOf('Files') !== -1;
    } else if (types.contains) {
      return types.contains('Files');
    } else {
      return false;
    }
  }
}