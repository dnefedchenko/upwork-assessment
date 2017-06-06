import { InvoiceSystemPage } from './app.po';

describe('invoice-system App', () => {
  let page: InvoiceSystemPage;

  beforeEach(() => {
    page = new InvoiceSystemPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
