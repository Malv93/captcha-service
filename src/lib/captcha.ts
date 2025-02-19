import svgCaptcha from "svg-captcha";

/**
 * Create a captcha with the svg-captcha library
 * @returns 
 */
export function createCaptcha() {
  return svgCaptcha.create({
    size: 6,
    noise: 2,
    color: false,
  });
}

/**
 * Replace double quotes with single quotes
 *
 * This method is used to generate a captcha svg tag without double quotes (").
 * In this way the svg tag returned by the /generate-captcha endpoint does not
 * include escaped double quotes, but single quotes, and can be copy pasted and 
 * displayed in an svg editor without additional work.
 * @param svgTag string
 * @returns string
 */
export function replaceEscapedDoublequotes(svgTag: string) {
  return svgTag.replaceAll('"', "'");
}
