import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import exercisesService from "../../services/exercisesService";

export default function ExerciseShowPage() {
  const { exercise_id } = useParams();
  const [exercise, setExercise] = useState(null);

  useEffect(() => {
    async function fetchExercise() {
      try {
        const fetchedExercise = await exercisesService.show(exercise_id);
        setExercise(fetchedExercise);
      } catch (err) {
        console.error("Error fetching exercise:", err);
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
          <p>Type: {exercise.type}</p>
          <p>{exercise.duration} Mins</p>
          <p>{exercise.weight} lbs</p>
          <p>{exercise.reps} Reps</p>
          <p>{exercise.sets} Sets</p>
          <p>{exercise.date}</p>
        </article>
        <Link to="/exercises/">Back to Exercises</Link>
        <Link to={`/exercises/${exercise_id}/edit`}>
          <button>Edit</button>
        </Link>
      </div>
    </main>
  );
}
