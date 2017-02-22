# Ng2Upload

## ng2-upload [![Angular 2 Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://github.com/mgechev/angular2-style-guide)

Follow me [![twitter](https://img.shields.io/twitter/follow/babarxm.svg?style=social&label=%20babarxm)](https://twitter.com/babarxm) to be notified about new releases.

## Setup
`npm install ng2-upload --save`

## Properties and methods
  - `addFile(file, options)` add a file to the queue with options (options are optional).
  - `addFiles(files[], options)` add a file to the queue with options (options are optional).
  - `clearFiles()` remove all files from queue.
  - `removeFile(index)` remove a specific file from queue.
  - `setOptions(options)` should set global options for upload applied for each upload.
  - `uploadAll()` upload all files from queue.
  - `uploadOne(index)` upload a specific file from queue.
  - `uploadFile(file, options)` upload a file directly without adding to queue.
  - `queue` array of files to be upload.

## Configuration

    import { Ng2Uploader, Ng2UploaderOptions } from "ng2-upload";
    @Component({
      selector: '',
      template: ''
    })
    export class DemoComponent {
      uploader: Ng2Uploader;
      options: Ng2UploaderOptions;
      files: [];
      constructor(){
        this.files = [...] // Array of file objects
        this.options = {
          url: "http://xyz.com/upload",
          headers: {
            "Authorization": "Bearer asd",
            "Another-Header": "Some value"
          },
          params: {
            "param1": "val1",
            "param2": "val2"
          }
        };
        this.uploader = new Ng2Uploader(this.options); // Global options applied for each upload
        this.uploader.addFiles(this.files);
        this.uploader.uploadAll();
      }
    }

## TODO
  - Add directive to pick files
  - Create a dropzone directive
  - Demo 

## Troubleshooting

Please follow this guidelines when reporting bugs and feature requests:

1. Use [GitHub Issues](https://github.com/babarxm/ng2-upload/issues) board to report bugs and feature requests (not our email address)
2. Please **always** write steps to reproduce the error. That way we can focus on fixing the bug, not scratching our heads trying to reproduce it.


### License

The MIT License (see the [LICENSE](https://github.com/babarxm/ng2-upload/blob/master/LICENSE) file for the full text)