import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DemoComponent } from './demo/demo.component';
import { NgUploaderModule } from './uploader';
import { MdlModule } from 'angular2-mdl';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgUploaderModule,
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
