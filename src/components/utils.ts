export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export type Split<T extends string, S extends string> = T extends `${infer V}${S}${infer H}` ? [V, H] : string[]
export const split = <T extends string, S extends string>(str: T, divider: S): Split<T, S> => {
  return str.split(divider) as any
}
