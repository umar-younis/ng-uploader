import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DemoComponent } from './demo/demo.component';
export { NgUploaderOptions, QueueItem, UploadResponse, Progress } from './uploader/ng-models';
export { NgUploader } from './uploader/ng-uploader';
export { NgUploaderModule } from './uploader/ng-uploader.module';
export { NgUploaderInterface } from './uploader/ng-uploader.interface';

import { MdlModule } from 'angular2-mdl';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    NgUploaderModule,
    HttpModule,
    MdlModule
  ],
  declarations: [
    AppComponent,
    DemoComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
