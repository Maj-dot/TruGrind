import WorkoutPlanForm from "../../components/WorkoutPlanForm/WorkoutPlanForm";
import { create } from "../../services/workoutPlansService";
import { useNavigate } from "react-router-dom";

export default function NewWorkoutPlanPage() {
  const navigate = useNavigate();

  function handleCreateWorkoutPlan(formData) {
    console.log("Data passed to create function:", formData);
    create(formData) 
      .then(() => {
        navigate("/workoutPlans");
      })
      .catch((error) => {
        console.error("Error creating workout plan:", error);
      });
  }

  return (
    <div>
      <h1>This Is The TruGrind!</h1>
      <WorkoutPlanForm handleCreate={handleCreateWorkoutPlan} />
    </div>
  );
}
