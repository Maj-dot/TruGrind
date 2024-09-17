import sendRequest from "./sendRequest";

const BASE_URL = "/api/workoutPlans";
const workoutPlansService = {
    index, 
};

export function index() {
    return sendRequest(BASE_URL);    
}

export default workoutPlansService;