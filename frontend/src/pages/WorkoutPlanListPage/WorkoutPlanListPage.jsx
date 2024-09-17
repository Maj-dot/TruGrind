import workoutPlansService from "../../services/workoutPlansService";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function WorkoutPlanListPage() {
    const [workoutPlans, setWorkoutPlans] = useState([]);
    const [error, setError] = useState(null);
  
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
      <main>
        {error && <p className="error-message">{error}</p>}
        <div className="workoutPlan-card">
          {workoutPlans.length > 0 ? (
            workoutPlans.map((workoutPlan) => (
              <div key={workoutPlan._id}>
                <article>
                  <header>
                    <h2>{workoutPlan.planName}</h2>
                    <p>
                      {workoutPlan.user.username} posted on{" "}
                      {new Date(workoutPlan.createdAt).toLocaleDateString()}
                    </p>
                  </header>
                  <p>{workoutPlan.text}</p>
                  <div className="button-container">
                    <Link to={`/workoutPlans/${workoutPlan._id}`} className="view-workoutPlan-link">
                      View Workout Plan
                    </Link>
                  </div>
                </article>
              </div>
            ))
          ) : (
            <p>No workout plans available. Add a new one!</p>
          )}
        </div>
      </main>
    );
  }
  