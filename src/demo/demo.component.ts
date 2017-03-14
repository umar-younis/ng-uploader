import { Component, ViewChild, ElementRef, Renderer } from '@angular/core';

import { NgUploader, NgUploaderOptions } from '../uploader';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.html'
})

export class DemoComponent {
  @ViewChild('file') file: ElementRef;
  options: NgUploaderOptions;
  constructor(private uploader: NgUploader, private renderer: Renderer) {
    this.options = {
      url: 'http://localhost:9001/upload',
      headers: {
        'Authorization': 'Bearer somekey',
        'Accept': 'application/json'
      },
      params: {
        'title': 'sometitle',
        'type': 'image'
      }
    };

    this.uploader.setOptions(this.options); // Set global options for uploading
  }

  selectFiles(): void {
    this.renderer.invokeElementMethod(this.file.nativeElement, "click");
  }

  // Extact file on select 
  updateFiles(): void {
    let files: any = this.file.nativeElement.files;
    if (files.length > 0) {
      for ( let i = 0; i < files.length; i++) {
        // You can set upload options for each file as well otherwise global options applied
        this.uploader.addFile(files[0], this.options);
      }
    }
    this.file.nativeElement.value = '';
  }
}