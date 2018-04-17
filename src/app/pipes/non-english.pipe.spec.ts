import { NonEnglishPipe } from './non-english.pipe';

describe('NonEnglishPipe', () => {
  it('create an instance', () => {
    const pipe = new NonEnglishPipe();
    expect(pipe).toBeTruthy();
  });
});
