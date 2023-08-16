import { APIUtils } from "../utils/index.js";

import { Utils } from "../../utils/index.js";

/**
 * Dùng function này để PING tới server.
 * @returns 
 */
async function PING(isDev = false) {
  let url = APIUtils.getBaseURL(isDev, false);
  return fetch(url).then(res => res.json());
}

let KnownDriveFolder = Utils.Assets.KnownDriveFolder;

/**
 * Dùng để lấy thông tin files trong một folder nào đó.
 * @param {string} name 
 * @param {keyof KnownDriveFolder} knownDriveFolder 
 */
async function getSavedDriveFilesInforAsync(name) {
  let url = APIUtils.getBaseURL() + `/drive/saved/file?name=${name}`;
  return fetch(url).then(res => res.json());
}

async function getDriveFileInforAsync(name, alt = "media") {
  let url = APIUtils.getBaseURL() + `/drive/file?name=${name}&alt=${alt}`;
  return fetch(url).then(res => res.json());
}

/**
 * Some others callers
 */
export const OtherCallers = {
  PING,
  getSavedDriveFilesInforAsync,
  getDriveFileInforAsync
};