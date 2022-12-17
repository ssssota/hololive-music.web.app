declare module 'colorthief' {
  /**
   * @param url When run in Node, this argument expects a path to the image. (When called in the browser, this argument expects an HTML image element, not a URL.)
   * @param colorCount Integer between 2 to 20
   * @param quality An optional argument that must be an Integer of value 1 or greater, and defaults to 10. The number determines how many pixels are skipped before the next one is sampled. We rarely need to sample every single pixel in the image to get good results. The bigger the number, the faster a value will be returned.
   */
  function getPalette(
    url: string,
    colorCount?: number,
    quality?: number
  ): Promise<[number, number, number][]>;
}
