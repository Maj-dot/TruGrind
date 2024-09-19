import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import workoutPlansService from "../../services/workoutPlansService";

export default function WorkoutPlanShowPage() {
  const { workoutPlanId } = useParams();
  const navigate = useNavigate();
  const [workoutPlan, setWorkoutPlan] = useState(null);
console.log(workoutPlanId);
  useEffect(() => {
    async function fetchWorkoutPlan() {
      try {
        const fetchedWorkoutPlan = await workoutPlansService.show(
          workoutPlanId
        );
        setWorkoutPlan(fetchedWorkoutPlan);
      } catch (err) {
        console.error("Error fetching workout plan:", err);
      }
    }
    fetchWorkoutPlan();
  }, [workoutPlanId]);

  async function handleDelete() {
    try {
      await workoutPlansService.deleteWorkoutPlan(workoutPlanId);
      navigate("/workoutPlans");
    } catch (err) {
      console.error("Error deleting workout plan:", err);
    }
  }

  if (!workoutPlan) return <p>Loading...</p>;

  return (
    <div>
      <div className="workoutPlan-card">
        <article>
          <h2>{workoutPlan.planName}</h2>
          <p>
            <strong>Goal Description:</strong> {workoutPlan.goalDescription}
          </p>
          <p>
            <strong>Target Value:</strong> {workoutPlan.targetValue}
          </p>
          <p>
            <strong>Current Value:</strong> {workoutPlan.currentValue}
          </p>
          <p>
            <strong>Deadline:</strong> {workoutPlan.deadline}
          </p>
          <p>
            <strong>Exercises:</strong> {workoutPlan.exercises.join(", ")}
          </p>
        </article>
        <button onClick={handleDelete}>Delete Workout Plan</button>
        <Link to="/workoutPlans">Back to Workout Plans</Link>
      </div>
    </div>

  );
}
