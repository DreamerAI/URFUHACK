const vars = import.meta.env;

export const env = {
  API_URL: vars.VITE_API_URL,
  LOCAL_APP: vars.LOCAL_APP_URL,
};
