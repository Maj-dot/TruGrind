import ExerciseForm from '../components/ExerciseForm/ExerciseForm';
import sendRequest from './sendRequest';

const BASE_URL = '/api/exercises';

export function create() {
    return sendRequest(BASE_URL, `POST`, ExerciseForm);
}