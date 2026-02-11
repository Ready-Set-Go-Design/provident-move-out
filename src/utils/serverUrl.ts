export const serverUrl = () => {
  console.log("API URL:", (import.meta as any).env.VITE_API_URL);
  return (import.meta as any).env.VITE_API_URL;
};
