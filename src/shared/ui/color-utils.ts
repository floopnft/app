export type HSLColor = [number, number, number];

export function hslFromArray([h, s, l]: HSLColor): string {
  return `hsl(${h}, ${s}%, ${l}%)`;
}
