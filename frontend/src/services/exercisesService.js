import sendRequest from "./sendRequest";

const BASE_URL = "/api/exercises";
const exercisesService = {
  create,
  index,
  show,
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

export default exercisesService;
