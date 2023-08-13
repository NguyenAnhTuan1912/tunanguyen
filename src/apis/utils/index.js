/**
 * Phương thức này dùng để lấy Base URL cho API.
 * @param {boolean} isDev 
 * @returns 
 */
function getBaseURL(isDev = true) {
  let baseUrl = {
    dev: "http://localhost:3000/api",
    prod: ""
  };
  return isDev ? baseUrl.dev : baseUrl.prod
}

export const APIUtils = {
  getBaseURL
};