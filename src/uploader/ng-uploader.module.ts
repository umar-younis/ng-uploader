import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgUploader } from './ng-uploader';
import { NgUploadSelectDirective } from './ng-select-directive';
import { NgUploadDropDirective } from './ng-drop-directive';

@NgModule({
  imports: [CommonModule],
  exports: [NgUploadSelectDirective, NgUploadDropDirective],
  declarations: [NgUploadSelectDirective, NgUploadDropDirective],
  providers: [NgUploader]
})
export class NgUploaderModule { }
