import { Link } from "react-router-dom";
import "./ExerciseListPage.css";

export default function ExerciseListPage(props) {
  return (
    <main>
      <div className="exercise-card">
        {props.exercises && props.exercises.length > 0 ? (
          props.exercises.map((exercise) => (
            <Link key={exercise._id} to={`/exercises/${exercise._id}`}>
              
              <article>
                <header>
                  <h2>{exercise.exercise_id}</h2>
                  <p>
                    {exercise.user.username} posted on{" "}
                    {new Date(exercise.createdAt).toLocaleDateString()}
                  </p>
                </header>
                <p>{exercise.text}</p>
              </article>
              <button>View Exercise</button>
            </Link>
          ))
        ) : (
          <p>If You Want To Stay True To The Grind Add A Exercise!</p>
        )}
      </div>
    </main>
  );
}
