import { Ng2UploadPage } from './app.po';

describe('ng2-upload App', () => {
  let page: Ng2UploadPage;

  beforeEach(() => {
    page = new Ng2UploadPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
