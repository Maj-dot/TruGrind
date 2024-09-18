import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import  workoutPlansService from "../../services/workoutPlansService";
import { deleteWorkoutPlan } from "../../services/workoutPlansService";

export default function WorkoutPlanShowPage() {
  const { workoutPlan_id } = useParams();
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchWorkoutPlan() {
      try {
        const fetchedWorkoutPlan = await workoutPlansService.show(
          workoutPlan_id
        );
        console.log(fetchedWorkoutPlan);
        setWorkoutPlan(fetchedWorkoutPlan);
      } catch (err) {
        console.error("Error fetching exerice:", err);
      }
    }
    fetchWorkoutPlan();
  }, [workoutPlan_id]);

  if (!workoutPlan) return <p>Loading...</p>;

  const handleEdit = () => {
    navigate(`/workoutPlans/${workoutPlan._id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await deleteWorkoutPlan(workoutPlan_id);
      navigate("/workoutPlans");
    } catch (err) {
      console.error("Error deleting workout plan:", err);
    }
  };

  return (
    <main>
      <div className="workoutPlan-card">
        <article>
          <header>
            <h2>{workoutPlan.workoutPlan_id}</h2>
          </header>
          <p>Plan name: {workoutPlan.planName}</p>
          <p>TruGrind Goal: {workoutPlan.goalDescription}</p>
          <p>Target Weight: {workoutPlan.targetValue}</p>
          <p>Current Weight: {workoutPlan.currentValue || "N/A"}</p>
          <p>Deadline: {workoutPlan.deadline || "No deadline set"}</p>
          <p>Exercises:</p>
          <ul>
            {workoutPlan.exercises && workoutPlan.exercises.length > 0 ? (
              workoutPlan.exercises.map((exercise, index) => (
                <li key={index}>{exercise.exerciseid || "Unnamed exercise"}</li>
              ))
            ) : (
              <li>No exercises added</li>
            )}
          </ul>
        </article>
        <button onClick={handleEdit}>Edit Workout</button>
        <button onClick={handleDelete}>Delete Workout</button>
        <Link to="/workoutPlans/">Back to Workout Plans</Link>
      </div>
    </main>
  );
}
