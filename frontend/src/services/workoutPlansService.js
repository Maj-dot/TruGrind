import sendRequest from "./sendRequest";

const BASE_URL = "/api/workoutPlans";
const workoutPlansService = {};

export function index() {
    return sendRequest(BASE_URL);    
}