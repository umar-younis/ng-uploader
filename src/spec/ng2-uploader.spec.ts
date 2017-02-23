import { TestBed, getTestBed } from '@angular/core/testing';
import { Ng2Uploader, Ng2UploaderOptions, QueueItem } from '../uploader';

describe('Ng2Uploader', () => {
  let uploader: Ng2Uploader;
  let file: any = {
    name: 'somename123.png'
  };
  let options: Ng2UploaderOptions = {
    url: 'someurl',
    headers: { 'Authorization': 'bearer asd' },
    params: { 'type': 'image' }
  };
  beforeEach(() => {
    uploader = new Ng2Uploader();
    uploader.setOptions(options);
    spyOn(uploader, "extractDataURLs");
  });

  it('should have following properties', () => {
    expect(uploader.queue.length).toBe(0);
    expect((<any>uploader).options).toBeDefined();
    expect(uploader.progress).toBe(0);
    expect((<any>uploader).tempQueue.length).toBe(0);
  });

  it('`addFile(file)` should add file to queue', () => {
    expect(uploader.queue.length).toBe(0);
    uploader.addFile(file);
    expect(uploader.queue.length).toBeGreaterThan(0);
  });

  it('`addFile(file, options)` should add file with options to queue', () => {
    expect(uploader.queue.length).toBe(0);
    uploader.addFile(file, options);
    expect(uploader.queue.length).toBeGreaterThan(0);
  });

  it('should call `setFileOptions(options)` before adding file', () => {
    expect(uploader.queue.length).toBe(0);
    spyOn(uploader, "setFileOptions");
    uploader.addFile(file, options);
    expect((<any>uploader).setFileOptions).toHaveBeenCalledWith(options);
  });

  it('`addFiles(files[])` should add files to queue', () => {
    expect(uploader.queue.length).toBe(0);
    uploader.addFiles([file]);
    expect(uploader.queue.length).toBeGreaterThan(0);
  });

  it('`addFiles(files[], options)` should add file with options to queue', () => {
    expect(uploader.queue.length).toBe(0);
    uploader.addFiles([file], options);
    expect(uploader.queue.length).toBeGreaterThan(0);
  });

  it('`addFiles(files[], options)` should add file with options to queue', () => {
    expect(uploader.queue.length).toBe(0);
    uploader.addFiles([file], options);
    expect(uploader.queue.length).toBeGreaterThan(0);
  });

  it('`clearFiles()` should remove all files from queue', () => {
    expect(uploader.queue.length).toBe(0);
    uploader.addFile(file, options);
    expect(uploader.queue.length).toBeGreaterThan(0);
    uploader.clearQueue();
    expect(uploader.queue.length).toBe(0);
  });

  it('`removeFile()` should remove specific file from queue', () => {
    expect(uploader.queue.length).toBe(0);
    uploader.addFile(file, options);
    expect(uploader.queue.length).toBeGreaterThan(0);
    uploader.removeFile(0);
    expect(uploader.queue.length).toBe(0);
  });

  it('`setOptions()` should set global options', () => {
    (<any>uploader).options = undefined;
    expect((<any>uploader).options).toBeUndefined();
    uploader.setOptions(options);
    expect((<any>uploader).options).toBeDefined();
  });

  it('`uploadAll()` should call `uploadQueue()` if files present', () => {
    uploader.addFile(file, options);
    spyOn(uploader, "uploadQueue").and.returnValue({ subscribe: () => {} });
    uploader.uploadAll();
    expect((<any>uploader).uploadQueue).toHaveBeenCalledWith(0, true);
  });

  it('`uploadAll()` should not call `uploadQueue()` if files not present', () => {
    spyOn(uploader, "uploadQueue").and.returnValue({ subscribe: () => {} });
    uploader.uploadAll();
    expect((<any>uploader).uploadQueue).not.toHaveBeenCalledWith(0, true);
  });

  it('`uploadOne()` should call `uploadQueue()` with specific index', () => {
    uploader.addFile(file, options);
    spyOn(uploader, "uploadQueue").and.returnValue({ subscribe: () => {} });
    uploader.uploadOne(0);
    expect((<any>uploader).uploadQueue).toHaveBeenCalledWith(0, false, false);
  });

  it('`uploadFile()` should should upload file', () => {
    uploader.addFile(file, options);
    expect((<any>uploader).tempQueue.length).toBe(0);
    expect(uploader.queue.length).toBe(1);
    spyOn(uploader, "uploadQueue").and.returnValue({ subscribe: () => {} });
    uploader.uploadFile(file, options);
    expect((<any>uploader).tempQueue.length).toBe(1);
    expect(uploader.queue.length).toBe(1);
    expect((<any>uploader).uploadQueue).toHaveBeenCalledWith(0, false, true);
  });
});