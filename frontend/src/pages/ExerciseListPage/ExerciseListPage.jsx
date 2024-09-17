import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import exercisesService from "../../services/exercisesService";
import "./ExerciseListPage.css";

export default function ExerciseListPage() {
  const [exercises, setExercises] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchExercises() {
      try {
        const fetchedExercises = await exercisesService.index();
        setExercises(fetchedExercises);
      } catch (err) {
        console.error("Error fetching exercises:", err);
      }
    }
    fetchExercises();
  }, []);

  async function handleDelete(exerciseId) {
    try {
      console.log(exerciseId);
      await exercisesService.deleteExercise(exerciseId);
      setExercises((prevExercises) =>
        prevExercises.filter((e) => e._id !== exerciseId)
      );
      navigate("/exercises");
    } catch (err) {
      console.error("Error deleting exercise:", err);
    }
  }

  return (
    <main>
      <div className="exercise-card">
        {exercises && exercises.length > 0 ? (
          exercises.map((exercise) => (
            <div key={exercise._id}>
              <article>
                <header>
                  <h2>{exercise.exercise_id}</h2>
                  <p>
                    {exercise.user.username} posted on{" "}
                    {new Date(exercise.createdAt).toLocaleDateString()}
                  </p>
                </header>
                <p>{exercise.text}</p>
                <div className="button-container">
                  <Link
                    to={`/exercises/${exercise._id}`}
                    className="view-exercise-link"
                  >
                    View Exercise
                  </Link>
                  <button className="delete-button">Delete</button>
                </div>
              </article>
            </div>
          ))
        ) : (
          <p>If you want to stay true to the grind, add an exercise!</p>
        )}
      </div>
    </main>
  );
}
