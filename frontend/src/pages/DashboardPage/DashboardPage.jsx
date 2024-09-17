import "../DashboardPage/DashboardPage.css";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const navigate = useNavigate();
  return (
    <div className="dashboard-container">
      <header className="dashboard-hero">
        <h1>Welcome to Your Dashboard!</h1>
        <p>Track your progress and manage your workouts here.</p>
      </header>

      <section className="dashboard-features">
        <h2>Your Features</h2>
        <div className="dashboard-feature-list">
          <div
            className="dashboard-feature-item"
            onClick={() => navigate("/workoutPlans")}
          >
            <h3>Workout Log</h3>
            <p>View and manage your workouts.</p>
          </div>
          <div className="dashboard-feature-item">
            <h3>Progress Reports</h3>
            <p>Track your fitness progress over time.</p>
          </div>
          <div className="dashboard-feature-item">
            <h3>Set Goals</h3>
            <p>Set new fitness goals and milestones.</p>
          </div>
        </div>
      </section>

      <footer className="dashboard-footer">
        <p>Stay focused on your TruGrind!</p>
      </footer>
    </div>
  );
}
