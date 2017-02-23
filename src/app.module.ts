import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DemoComponent } from './demo/demo.component';
import { Ng2UploaderModule } from './uploader';
import { MdlModule } from 'angular2-mdl';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2UploaderModule,
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
