const vars = import.meta.env;

export const env = {
  API_URL: vars.VITE_API_URL,
  SBER_API: vars.SBER_API_URL,
  SBER_TOKEN: vars.SBER_API_TOKEN,
  SBER_KEY: vars.SBER_API_KEY,
  LOCAL_API: vars.LOCAL_API_URL,
};
