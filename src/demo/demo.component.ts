import { Component, ViewChild, ElementRef } from '@angular/core';

import { Ng2Uploader, Ng2UploaderOptions } from '../uploader';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.html'
})

export class DemoComponent {
  @ViewChild('file') file: ElementRef;
  uploader: Ng2Uploader;
  options: Ng2UploaderOptions;
  constructor() {
    let url: string = 'http://someurl.com/upload';
    let headers: any = {
      'Authorization': 'Bearer somekey',
      'Accept': 'application/json'
    };
    let params: any = {
      'title': 'sometitle',
      'type': 'image'
    };
    this.options = new Ng2UploaderOptions(url, headers, params); // Provide upload information
    this.uploader = new Ng2Uploader(this.options); // Passing options on initialization is not recommended

    // You can set options later with
    // this.uploader.setOptions(this.options)
  }

  // Extact file on select 
  updateFiles(): void {
    let files: any = this.file.nativeElement.files;
    if (files.length > 0) {
      // You can set upload options for each file as well otherwise global options applied
      this.uploader.addFile(files[0], this.options);
    }
  }
}