import sendRequest from "./sendRequest";
const BASE_URL = "/api/progress";

const progressService = {
  addProgress,
  getProgress,
  updateProgress,
  deleteProgress
}

export function addProgress(progressData) {
  return sendRequest(BASE_URL, "POST", progressData);
}

export function getProgress() {
  return sendRequest(BASE_URL, "GET");
}

export function updateProgress(id, progressData) {
  return sendRequest(`${BASE_URL}/${id}`, "PUT", progressData);
}

export function deleteProgress(id) {
  return sendRequest(`${BASE_URL}/${id}`, "DELETE");
}

export default progressService;