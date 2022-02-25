export const isHex = (str: string): boolean => {
  return /^[0-9a-fA-F]+$/.test(str);
};
