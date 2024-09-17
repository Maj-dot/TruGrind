import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import exercisesService from '../../services/exercisesService'; // Import your exercisesService
import './ExerciseListPage.css';

export default function ExerciseListPage() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    async function fetchExercises() {
      try {
        const fetchedExercises = await exercisesService.index();
        setExercises(fetchedExercises);
      } catch (err) {
        console.error('Error fetching exercises:', err);
      }
    }
    fetchExercises();
  }, []); // Empty dependency array to run this effect once on mount

  return (
    <main>
      <div className="exercise-card">
        {exercises && exercises.length > 0 ? (
          exercises.map((exercise) => (
            <Link key={exercise._id} to={`/exercises/${exercise._id}`}>
              <article>
                <header>
                  <h2>{exercise.exercise_id}</h2>
                  <p>{exercise.user.username} posted on {new Date(exercise.createdAt).toLocaleDateString()}</p>
                </header>
                <p>{exercise.text}</p>
                <button>View Exercise</button>
              </article>
            </Link>
          ))
        ) : (
          <p>If You Want To Stay True To The Grind Add An Exercise!</p>
        )}
      </div>
    </main>
  );
}

