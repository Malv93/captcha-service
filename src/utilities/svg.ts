/**
 * Replace double quotes with single quotes
 *
 * This method is used to generate a captcha svg tag without escaped double quotes (\").
 * In this way the svg tag returned by the /generate-captcha endpoint can be
 * correctly interpreted and displayed additional work.
 * @param svgTag string
 * @returns string
 */
export function replaceEscapedDoublequotes(svgTag: string) {
  return svgTag.replaceAll('"', "'");
}
