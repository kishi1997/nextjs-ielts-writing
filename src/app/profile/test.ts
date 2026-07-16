export const COLORS = [
  'black',
  'brown',
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'violet',
  'grey',
  'white',
];

export function decodedValue(colors: string[]): number {
  return Number(
    colors
      .slice(0, 2)
      .map((color) => {
        COLORS.indexOf(color);
      })
      .join(''),
  );
}
