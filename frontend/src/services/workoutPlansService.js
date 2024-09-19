import sendRequest from "./sendRequest";

const BASE_URL = "/api/workoutPlans";
const workoutPlansService = {

  index,
  show,
  create,
  update,
  deleteWorkoutPlan,

};

export function index() {
  return sendRequest(BASE_URL);
}

export function show(workoutPlanId) {
  console.log(workoutPlanId);
  return sendRequest(`${BASE_URL}/${workoutPlanId}`);
}

export function create(workoutPlanData) {
  return sendRequest(BASE_URL, `POST`, workoutPlanData);
}

export function update(workoutPlanId, workoutPlanData) {

  return sendRequest(`${BASE_URL}/${workoutPlanId}`, "PUT", workoutPlanData);
}

export function deleteWorkoutPlan(workoutPlanId) {
  return sendRequest(`${BASE_URL}/${workoutPlanId}`, "DELETE");
}

export default workoutPlansService;

