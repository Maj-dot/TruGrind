import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import exercisesService from '../../services/exercisesService';

export default function ExerciseShowPage() {
    const { exercise_id } = useParams();
    const [exercise, setExercise] = useState(null);

    useEffect(() => {
        async function fetchExercise() {
            try {
                const fetchedExercise = await exercisesService.show(exercise_id);
                setExercise(fetchedExercise);
            } catch (err) {
                console.error('Error fetching exercise:', err);
            }
        }
        fetchExercise();
    }, [exercise_id]);

    if (!exercise) return <p>Loading...</p>;

    return (
        <main>
            <div className="exercise-card">
                <article>
                    <header>
                        <h2>{exercise.exercise_id}</h2>
                    </header>
                    <p>{exercise.type}</p>
                    <p>{exercise.duration} Mins</p>
                    <p>{exercise.weight}</p>
                    <p>{exercise.reps}</p>
                    <p>{exercise.sets}</p>                   
                </article>
                <Link to="/exercises">Back to Exercises</Link>
            </div>
        </main>
    );
}