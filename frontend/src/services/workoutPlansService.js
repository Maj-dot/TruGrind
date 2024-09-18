import sendRequest from "./sendRequest";

const BASE_URL = "/api/workoutPlans";
const workoutPlansService = {
    index, 
    show,
    create,
};

export function index() {
    return sendRequest(BASE_URL);    
}

export function show(workoutPlanId) {
    return sendRequest(`${BASE_URL}/${workoutPlanId}`);
}

export function create(workoutPlanData) {
    return sendRequest(BASE_URL, `POST`, workoutPlanData);
}

export default workoutPlansService;