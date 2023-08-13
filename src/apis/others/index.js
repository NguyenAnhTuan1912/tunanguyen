import { APIUtils } from "../utils/index.js";

/**
 * Use this function to ping to the host.
 * @returns 
 */
async function PING(isDev = true) {
  let url = isDev ? "http://localhost:3000" : "";
  return fetch(url).then(res => res.json());
}

/**
 * Some others callers
 */
export const OtherCallers = {
  PING
};