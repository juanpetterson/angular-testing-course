import { fakeAsync, flush, flushMicrotasks, tick } from '@angular/core/testing';

describe('Async Testing Examples', () => {
  it('Asynchronous test with Jasmine done()', (done: DoneFn) => {
    let test = false;

    setTimeout(() => {
      test = true;

      expect(test).toBeTruthy();

      done();
    }, 1000);
  });

  it('Asynchronous test with - setTimeout()', fakeAsync(() => {
    let test = false;

    setTimeout(() => {
      test = true;

      expect(test).toBeTruthy();
    }, 1000);

    flush();

    expect(test).toBeTruthy();
  }));

  it('Asynchronous test with - plain Promise', fakeAsync(() => {
    let test = false;

    console.log('Creating promise');

    Promise.resolve()
      .then(() => {
        console.log('Promise first then() evaluated successfully');

        test = true;

        return Promise.resolve();
      })
      .then(() => {
        console.log('Promise second then() evaluated successfully');

        // test = true;
      });

    flushMicrotasks();

    console.log('Running test assertions');

    expect(test).toBeTruthy();
  }));

  it('Asynchronous test with - Promise + setTimeout', fakeAsync(() => {
    let counter = 0;

    Promise.resolve().then(() => {
      counter += 10;

      setTimeout(() => {
        counter += 1;
      }, 1000);
    });

    expect(counter).toBe(0);

    flushMicrotasks();

    expect(counter).toBe(10);

    tick(500);

    expect(counter).toBe(10);

    tick(500);

    expect(counter).toBe(11);
  }));
});
