import { Creo2018Page } from './app.po';

describe('creo2018 App', () => {
  let page: Creo2018Page;

  beforeEach(() => {
    page = new Creo2018Page();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
