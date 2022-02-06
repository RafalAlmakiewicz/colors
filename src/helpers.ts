export const Saturation = (hex: string) => {
  let [r, g, b] = hexToRgb(hex);
  r /= 255;
  g /= 255;
  b /= 255;
  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let s,
    l = (max + min) / 2;

  if (max == min) s = 0;
  else s = l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min);
  return Math.round(s * 100);
};

export const hexToRgb = (hex: string) => {
  return [redValue(hex), greenValue(hex), blueValue(hex)];
};

export const redValue = (hex: string) => parseInt(hex.slice(1, 3), 16);
export const greenValue = (hex: string) => parseInt(hex.slice(3, 5), 16);
export const blueValue = (hex: string) => parseInt(hex.slice(5, 7), 16);

export const formatColor = (color: string) => {
  if (color[0] !== "#") color = "#" + color;
  return color.toUpperCase();
};

export const unique = <T>(value: T, index: number, self: Array<T>) =>
  self.indexOf(value) === index;
