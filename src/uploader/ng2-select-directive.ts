import { Directive, ElementRef, Renderer } from '@angular/core';
import { Ng2Uploader } from './ng2-uploader';

@Directive({
  selector: '[ng2UploadSelect]'
})
export class Ng2UploadSelectDirective {
  el: ElementRef;
  private isUploadBotton: boolean = false;
  constructor(el: ElementRef, private uploader: Ng2Uploader) {
    this.el = el;
    this.isValidButton();
    this.el.nativeElement.addEventListener('change', this.onChange.bind(this));
  }

  onChange(): void {
    const files = this.el.nativeElement.files;
    this.uploader.addFiles(files);
    this.reset();
  }

  reset(): void {
    this.el.nativeElement.value = '';
  }

  private isValidButton(): void {
    const ele: ElementRef = this.el.nativeElement;
    if (ele instanceof HTMLInputElement && ele.type === 'file') {
      this.isUploadBotton = true;
    }
  }
}