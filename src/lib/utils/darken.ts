import convert from 'color-convert';

export const darken = (color: string, amount = { s: 0, l: 0 }) => {
  const [h, s, l] = convert.hex.hsl(color);
  return `#${convert.hsl.hex([
    h,
    Math.max(0, s - amount.s),
    Math.max(0, l - amount.l),
  ])}`;
};
