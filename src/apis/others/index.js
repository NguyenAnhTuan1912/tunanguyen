import { APIUtils } from "../utils/index.js";

import { Utils } from "../../utils/index.js";

/**
 * Dùng function này để PING tới server.
 * @returns 
 */
async function PING(isDev = true) {
  let url = isDev ? "http://localhost:3000" : "";
  return fetch(url).then(res => res.json());
}

let KnownDriveFolder = Utils.Assets.KnownDriveFolder;

/**
 * Dùng để lấy thông tin files trong một folder nào đó.
 * @param {string} name 
 * @param {keyof KnownDriveFolder} knownDriveFolder 
 */
async function getDriveFilesInforAsync(name) {
  let url = APIUtils.getBaseURL() + `/drive/saved/file?name=${name}`;
  return fetch(url).then(res => res.json());
}

/**
 * Some others callers
 */
export const OtherCallers = {
  PING,
  getDriveFilesInforAsync
};