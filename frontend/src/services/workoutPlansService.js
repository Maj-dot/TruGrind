import sendRequest from "./sendRequest";

const BASE_URL = "/api/workoutPlans";
const workoutPlansService = {
    index, 
    show,
};

export function index() {
    return sendRequest(BASE_URL);    
}

export function show(workoutPlanId) {
    return sendRequest(`${BASE_URL}/${workoutPlanId}`);
}

export default workoutPlansService;