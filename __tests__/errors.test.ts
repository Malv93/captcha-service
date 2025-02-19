import { getErrorMessage } from "../src/lib/errors";

describe('getErrorMessage', () => {
  it('should return only the message if the argument is instance of Error', () => {
    const error = new Error('Failed to genereate the captcha');
    expect(getErrorMessage(error)).toBe('Failed to genereate the captcha');
  });

  it('should return a string if the argument is not an Error object', () => {
    const error = 'Connection failed';
    expect(getErrorMessage(error)).toBe('Connection failed');
  });
});