import sendRequest from './sendRequest';

const BASE_URL = '/api/exercises';
const exercisesService = {
    create,
    index,
};


export function index() {
    return sendRequest(BASE_URL);
}

export function create(exerciseData) {
    console.log('Data sent to server:', exerciseData)
    return sendRequest(BASE_URL, `POST`, exerciseData );
}

export default exercisesService;