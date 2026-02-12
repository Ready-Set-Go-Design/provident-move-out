const humanizeString = (str: string) => {
  if (!str) return "";
  return str.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};
export default humanizeString;
