export type HSLColor = [number, number, number];

export function hslFromArray([h, s, l]: HSLColor): string {
  return `hsl(${h}, ${s}%, ${l}%)`;
}

export function reduceLightning(hsl: HSLColor | 'transparent'): string {
  'worklet';
  if (hsl === 'transparent') return hsl;
  const [h, s, l] = hsl;
  const sFix = Math.max(0, s - 40);
  const lFix = Math.max(0, l - 30);
  return `hsl(${h}, ${sFix}%, ${lFix}%)`;
}
