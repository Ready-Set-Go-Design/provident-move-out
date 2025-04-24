const humanizeString = (str: string) => {
  return str.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};
export default humanizeString;
