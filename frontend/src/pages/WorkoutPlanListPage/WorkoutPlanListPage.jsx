import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import workoutPlansService from "../../services/workoutPlansService";
import "./WorkoutPlanListPage.css"; // Import the CSS file

export default function WorkoutPlanListPage() {
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchWorkoutPlans() {
      try {
        const fetchedWorkoutPlans = await workoutPlansService.index();
        setWorkoutPlans(fetchedWorkoutPlans);
      } catch (err) {
        console.error("Error fetching workout plans:", err);
        setError("Failed to load workout plans.");
      }
    }
    fetchWorkoutPlans();
  }, []);

  return (
    <main className="workoutPlanList-container">
      {error && <p className="error-message">{error}</p>}
      <div className="workoutPlan-card-container">
        {workoutPlans.length > 0 ? (
          workoutPlans.map((workoutPlan) => (
            <div className="workoutPlan-card" key={workoutPlan._id}>
              <article>
                <header>
                  <h2>{workoutPlan.planName}</h2>
                  <p className="posted-date">
                    Posted on{" "}
                    {new Date(workoutPlan.createdAt).toLocaleDateString()}
                  </p>
                </header>
                <Link
                  to={`/workoutPlans/${workoutPlan._id}`}
                  className="view-workoutPlan-link"
                >
                  View Workout Plan
                </Link>
              </article>
            </div>
          ))
        ) : (
          <p>No workout plans available. Add a new one!</p>
        )}
      </div>
      <button
        className="create-workoutPlan-button"
        onClick={() => navigate("/workoutPlans/new")}
      >
        Add New
      </button>
    </main>
  );
}
