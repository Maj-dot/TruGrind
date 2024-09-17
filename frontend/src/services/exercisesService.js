import sendRequest from "./sendRequest";

const BASE_URL = "/api/exercises";
const exercisesService = {
  create,
  index,
  show,
  update
};

export function index() {
  return sendRequest(BASE_URL);
}

export function create(exerciseData) {
  return sendRequest(BASE_URL, `POST`, exerciseData);
}

export function show(exerciseId) {
  return sendRequest(`${BASE_URL}/${exerciseId}`);
}

export function update(exerciseId, exerciseData) {
  return sendRequest(`${BASE_URL}/${exerciseId}`, 'PUT', exerciseData);
}

export default exercisesService;
