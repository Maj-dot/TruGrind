import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import exercisesService from "../../services/exercisesService";

export default function ExerciseUpdatePage() {
  const { exercise_id } = useParams();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState({
    type: "",
    duration: "",
    reps: "",
    weight: "",
    sets: "",
    date: "",
  });

  useEffect(() => {
    async function fetchExercise() {
      try {
        const fetchedExercise = await exercisesService.index();
        setExercise(fetchedExercise);
      } catch (err) {
        console.error("Error fetching exercise:", err);
      }
    }
    fetchExercise();
  }, [exercise_id]);

  async function handleUpdate(e) {
    e.preventDefault();
    console.log("Exercise ID:", exercise_id);
    console.log("Exercise Data:", exercise);
    try {
      await exercisesService.update(exercise_id, exercise);
      navigate(`/exercises/${exercise_id}`);
    } catch (err) {
      console.error("Error updating exercise:", err);
    }
    navigate("/exercises");
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setExercise({ ...exercise, [name]: value });
  }

  return (
    <main>
      <div className="exercise-form-container">
        <form className="exercise-form" onSubmit={handleUpdate}>
          <label htmlFor="exercise_id-input">Exercise</label>
          <input
            required
            type="text"
            name="exercise_id"
            id="exercise_id-input"
            value={exercise.exercise_id}
            onChange={handleChange}
          />
          <label htmlFor="type-input">Type</label>
          <select
            required
            name="type"
            id="type-input"
            value={exercise.type}
            onChange={handleChange}
          >
            <option value="Cardio">Cardio</option>
            <option value="Strength">Strength</option>
            <option value="Flexibility">Flexibility</option>
            <option value="Core">Core</option>
            <option value="HIIT">HIIT</option>
            <option value="Balance & Stability">Balance & Stability</option>
            <option value="Mobility Workouts">Mobility Workouts</option>
          </select>
          <label htmlFor="duration-input">Duration</label>
          <select
            required
            name="duration"
            id="duration-input"
            value={exercise.duration}
            onChange={handleChange}
          >
            <option value="5">5 Mins</option>
            <option value="10">10 Mins</option>
            <option value="15">15 Mins</option>
            <option value="20">20 Mins</option>
            <option value="25">25 Mins</option>
            <option value="30">30 Mins</option>
            <option value="35">35 Mins</option>
            <option value="40">40 Mins</option>
            <option value="45">45 Mins</option>
            <option value="50">50 Mins</option>
            <option value="55">55 Mins</option>
            <option value="60">60 Mins</option>
          </select>
          <label htmlFor="weight-input">Weight</label>
          <input
            type="text"
            name="weight"
            id="weight-input"
            value={exercise.weight}
            onChange={handleChange}
          />
          <label htmlFor="reps-input">Reps</label>
          <input
            type="number"
            name="reps"
            id="reps-input"
            value={exercise.reps}
            onChange={handleChange}
          />
          <label htmlFor="sets-input">Sets</label>
          <input
            type="number"
            name="sets"
            id="sets-input"
            value={exercise.sets}
            onChange={handleChange}
          />
          <label htmlFor="date-input">Date</label>
          <input
            type="date"
            name="date"
            id="date-input"
            value={exercise.date}
            onChange={handleChange}
          />
          <button type="submit">Update The Grind!</button>
        </form>
      </div>
    </main>
  );
}
