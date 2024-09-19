import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import exercisesService from "../../services/exercisesService";
import "./ExerciseListPage.css";

export default function ExerciseListPage() {
  const [exercises, setExercises] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchExercises() {
      try {
        const fetchedExercises = await exercisesService.index();
        setExercises(fetchedExercises);
      } catch (err) {
        console.error("Error fetching exercises:", err);
        setError("Failed to load exercises.");
      }
    }
    fetchExercises();
  }, []);

  const handleDelete = async (exerciseId) => {
    try {
      await exercisesService.deleteExercise(exerciseId);
      setExercises(exercises.filter((exercise) => exercise._id !== exerciseId));
    } catch (err) {
      console.error("Error deleting exercise:", err);
    }
  };

  return (
    <main className="exerciseList-container">
      {error && <p className="error-message">{error}</p>}
      <div className="exercise-card-container">
        {exercises.length > 0 ? (
          exercises.map((exercise) => (
            <div className="exercise-card" key={exercise._id}>
              <article>
                <header>
                  <h2>{exercise.exerciseid}</h2>
                  <p className="posted-date">
                    Posted on{" "}
                    {new Date(exercise.createdAt).toLocaleDateString()}
                  </p>
                </header>
                {/* Button container */}
                <div className="exercise-buttons">
                  <button
                    className="view-exercise-button"
                    onClick={() => navigate(`/exercises/${exercise._id}`)}
                  >
                    View Exercise
                  </button>
                  <button
                    className="delete-exercise-button"
                    onClick={() => handleDelete(exercise._id)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            </div>
          ))
        ) : (
          <p>No exercises available. Add a new one!</p>
        )}
      </div>
    </main>
  );
}
