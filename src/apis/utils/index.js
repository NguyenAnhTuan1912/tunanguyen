/**
 * Phương thức này dùng để lấy Base URL cho API.
 * @param {boolean} isDev 
 * @returns 
 */
function getBaseURL(isDev = false, isAPI = true) {
  let baseUrl = {
    dev: "http://localhost:3000",
    prod: "https://tunanguyen-api.vercel.app"
  };
  let api = isAPI ? "/api" : "";
  return (isDev ? baseUrl.dev : baseUrl.prod) + api;
}

export const APIUtils = {
  getBaseURL
};