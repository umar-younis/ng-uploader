# Angular-file-upload

## angular2-file-upload [![Angular 2 Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://github.com/mgechev/angular2-style-guide)

Follow me [![twitter](https://img.shields.io/twitter/follow/babarxm.svg?style=social&label=%20babarxm)](https://twitter.com/babarxm) to be notified about new releases.

## Setup
`npm install angular2-file-upload --save`

## Properties and methods
  - `addFile(file, options)` add a file to the queue with options (options are optional).
  - `addFiles(files[], options)` add a file to the queue with options (options are optional).
  - `clearQueue()` remove all files from queue.
  - `removeFile(index)` remove a specific file from queue.
  - `setOptions(options)` should set global options for upload applied for each upload.
  - `uploadAll()` upload all files from queue.
  - `uploadOne(index)` upload a specific file from queue.
  - `uploadFile(file, options)` upload a file directly without adding to queue.
  - `queue` array of files to be upload.
  - `notifier()` returns observable which emits data after each upload completed with response.

## Directives
  - `ng2UploadSelect` directive to apply on input file type.

## Configuration
### Simple upload example
#### To check full functionality locate demo directory files
    import { Ng2Uploader, Ng2UploaderOptions } from "angular2-file-upload";
    @Component({
      selector: '',
      template: ''
    })
    export class DemoComponent {
      options: Ng2UploaderOptions;
      files: [];
      constructor(private uploader: Ng2Uploader){
        this.files = [...] // Array of file objects
        this.options = {
          url: "http://xyz.com/upload",
          headers: { "Authorization": "Bearer asd", "Accept" : "something" },
          params: { "param1": "val1", "param2": "val2" }
        };
        this.uploader.setOptions(this.options); // Global options applied for each upload
        this.uploader.addFiles(this.files);
        this.uploader.uploadAll();
      }
    }

### Example with each file options
    import { Ng2Uploader, Ng2UploaderOptions } from "angular2-file-upload";
    @Component({
      selector: '',
      template: ''
    })
    export class DemoComponent {
      file: {};
      constructor(private uploader: Ng2Uploader){
        this.file = {} // File object
        this.uploader = new Ng2Uploader();
        this.options = {
          url: "http://xyz.com/upload",
          headers: { "Authorization": "Bearer asd", "Accept" : "something" },
          params: { "param1": "val1", "param2": "val2" }
        };
        this.uploader.addFile(this.file, this.options); // Set options for each file
        this.uploader.uploadAll();
      }
    }

## TODO
  - Create a dropzone directive
  - Demo 

## Troubleshooting

Please follow this guidelines when reporting bugs and feature requests:

1. Use [GitHub Issues](https://github.com/babarxm/angular2-file-upload/issues) board to report bugs and feature requests (not our email address)
2. Please **always** write steps to reproduce the error. That way we can focus on fixing the bug, not scratching our heads trying to reproduce it.


### License

The MIT License (see the [LICENSE](https://github.com/babarxm/angular2-file-upload/blob/master/LICENSE) file for the full text)