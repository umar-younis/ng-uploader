import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2Uploader } from './ng2-uploader';
import { Ng2UploadSelectDirective } from './ng2-select-directive';

@NgModule({
  imports: [CommonModule],
  exports: [Ng2UploadSelectDirective],
  declarations: [Ng2UploadSelectDirective],
  providers: [Ng2Uploader]
})
export class Ng2UploaderModule { }
