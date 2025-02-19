import { replaceEscapedDoublequotes } from "../src/lib/captcha";

describe("replaceEscapedDoublequotes", () => {
  it("should replace all double quotes with single quotes", () => {
    const input = '<svg width="100" height="50" viewBox="0 0 100 50">';
    const expected = "<svg width='100' height='50' viewBox='0 0 100 50'>";

    expect(replaceEscapedDoublequotes(input)).toBe(expected);
  });
});
