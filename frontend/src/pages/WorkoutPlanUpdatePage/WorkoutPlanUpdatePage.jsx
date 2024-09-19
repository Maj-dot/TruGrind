
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import workoutPlansService from "../../services/workoutPlansService";
import exercisesService from "../../services/exercisesService";

export default function UpdateWorkoutPlanPage() {
  const { workoutPlanId } = useParams();
  const navigate = useNavigate();
  const [workoutPlan, setWorkoutPlan] = useState({
    planName: "",
    goalDescription: "",
    targetValue: "",
    currentValue: "",
    deadline: "",
    exercises: [],
  });
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    async function fetchWorkoutPlan() {
        console.log("Workout Plan ID:", workoutPlanId);
      try {
        const fetchedWorkoutPlan = await workoutPlansService.show(workoutPlanId);
        setWorkoutPlan(fetchedWorkoutPlan);
      } catch (err) {
        console.error("Error fetching workout plan:", err);
      }
    }

    async function fetchExercises() {
      try {
        const fetchedExercises = await exercisesService.index();
        setExercises(fetchedExercises);
      } catch (err) {
        console.error("Error fetching exercises:", err);
      }
    }
    fetchWorkoutPlan();
    fetchExercises();
  }, [workoutPlanId]);

  function handleChange(e) {
    const { name, value } = e.target;
    setWorkoutPlan((prevWorkoutPlan) => ({
      ...prevWorkoutPlan,
      [name]: value,
    }));
  }

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      await workoutPlansService.update(workoutPlanId, workoutPlan);
      navigate(`/workoutPlans/${workoutPlanId}`);
    } catch (err) {
      console.error("Error updating workout plan:", err);
    }
  }

  return (
    <div>
      <h1>Update Workout Plan</h1>
      <form className="workoutPlan-form-container" onSubmit={handleUpdate}>
      <label htmlFor="planName_input">Plan Name</label>
          <input
            type="text"
            id="planName_input"
            name="planName"
            value={workoutPlan.planName}
            onChange={handleChange}
          />
          <label htmlFor="goalDescription_input">Goal Description</label>
          <textarea
            id="goalDescription_input"
            name="goalDescription"
            value={workoutPlan.goalDescription}
            onChange={handleChange}
          />
          <label htmlFor="targetValue_input">Target Value</label>
          <input
            type="number"
            id="targetValue_input"
            name="targetValue"
            value={workoutPlan.targetValue}
            onChange={handleChange}
          />
          <label htmlFor="currentValue_input">Current Value</label>
          <input
            type="number"
            id="currentValue_input"
            name="currentValue"
            value={workoutPlan.currentValue}
            onChange={handleChange}
          />
          <label htmlFor="deadline_input">Deadline</label>
          <input
            type="date"
            id="deadline_input"
            name="deadline"
            value={workoutPlan.deadline}
            onChange={handleChange}
          />
        <label htmlFor="exercises_input">Select Exercise</label>
        <select
          id="exercises_input"
          name="exercises"
          value={workoutPlan.exercises}
          onChange={handleChange}
          multiple
        >
          <option value="" disabled>
            --Select exercises--
          </option>
          {exercises.map((exercise) => (
            <option key={exercise._id} value={exercise._id}>
              {exercise.type}
            </option>
          ))}
        </select>
        <button type="submit">Update Workout Plan</button>
      </form>
    </div>
  );
}

