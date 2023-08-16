import { APIUtils } from "../utils/index.js";

const base = {
  work: APIUtils.getBaseURL() + "/work",
  works: APIUtils.getBaseURL() + "/works"
}

function getWorksAsync(limit, skip, query) {
  return fetch(base.works).then(res => res.json());
}

/**
 * Object này chứa các hàm call api cho work.
 */
export const WorkCallers = {
  getWorksAsync
};