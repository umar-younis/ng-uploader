export class Ng2UploaderOptions {
  url: string;
  headers: Object;
  params: Object;

  constructor(url: string, headers: Object, params: Object) {
    this.url = url;
    this.headers = headers;
    this.params = params;
  }
}