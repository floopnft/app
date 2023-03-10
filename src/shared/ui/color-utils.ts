export type ColorArray = [number, number, number];
export type OptionalColorArray = ColorArray | 'transparent';

export const COLOR_TRANSPARENT = 'transparent';

export function rgbFromArray(color: ColorArray): string {
  'worklet';
  if (color.length !== 3) {
    return COLOR_TRANSPARENT;
  }
  return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
}

export function optionalRgbFromArray(color: OptionalColorArray): string {
  'worklet';
  if (!color) return COLOR_TRANSPARENT;
  if (color === COLOR_TRANSPARENT) return color;
  return rgbFromArray(color);
}
