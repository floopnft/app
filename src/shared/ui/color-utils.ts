export type ColorArray = [number, number, number];
export type OptionalColorArray = ColorArray | 'transparent';

export const TRANSPARENT_COLOR = 'transparent';

export function rgbFromArray(color: ColorArray): string {
  'worklet';
  if (color.length !== 3) {
    return TRANSPARENT_COLOR;
  }
  return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
}

export function optionalRgbFromArray(color: OptionalColorArray): string {
  'worklet';
  if (!color) return TRANSPARENT_COLOR;
  if (color === TRANSPARENT_COLOR) return color;
  return rgbFromArray(color);
}
