import "../App/App.css";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import { getUser } from "../../services/authService";
import SignUpPage from "../SignUpPage/SignUpPage";
import LoginPage from "../LogInPage/LogInPage";
import Navbar from "../../components/NavBar/NavBar";
import exercisesService from "../../services/exercisesService";
import workoutPlansService from "../../services/workoutPlansService";
import HomePage from "../HomePage/HomePage";
import DashboardPage from "../DashboardPage/DashboardPage";
import NewExercisePage from "../NewExercisePage/NewExercisePage";
import NewWorkoutPlanPage from "../NewWorkoutPlanPage/NewWorkoutPlanPage";
import ExerciseListPage from "../ExerciseListPage/ExerciseListPage";
import WorkoutPlanListPage from "../WorkoutPlanListPage/WorkoutPlanListPage";
import ExerciseShowPage from "../ExerciseShowPage/ExerciseShowPage";
import WorkoutPlanShowPage from "../WorkoutPlanShowPage/WorkoutPlanShowPage";
import ExerciseUpdatePage from "../ExerciseUpdatePage/ExerciseUpdatePage";
import WorkoutPlanpdatePage from "../WorkoutPlanUpdatePage/WorkoutPlanUpdatePage";
import ProgressReportPage from "../ProgressReportPage/ProgressReportPage";

function App() {
  const [user, setUser] = useState(getUser());
  const [exercises, setExercises] = useState([]);
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const navigate = useNavigate();

  const handleCreate = async (exerciseForm) => {
    const newExercise = await exercisesService.create(exerciseForm);
    setExercises([newExercise, ...exercises]);
    navigate("/exercises");
  };

  const handleCreateWorkoutPlan = async (workoutPlanForm) => {
    const newWorkoutPlan = await workoutPlansService.create(workoutPlanForm);
    setWorkoutPlans([newWorkoutPlan, ...workoutPlans]);
    navigate("/workoutPlans");
  };

  useEffect(() => {
    const fetchAllExercises = async () => {
      const exerciseData = await exercisesService.index();
      console.log("Fetched exercises:", exerciseData);
      setExercises(exerciseData);
    };
    fetchAllExercises();
  }, []);

  useEffect(() => {
    const fetchAllWorkoutPlans = async () => {
      const workoutPlanData = await workoutPlansService.index();
      console.log("Fetched workout plans:", workoutPlanData);
      setWorkoutPlans(workoutPlanData);
    };
    fetchAllWorkoutPlans();
  }, []);

  return (
    <main id="react-app">
      <Navbar user={user} setUser={setUser} />
      <section id="main-section">
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<DashboardPage />} />
              <Route
                path="/exercises"
                element={<ExerciseListPage exercises={exercises} />}
              />
              <Route
                path="/exercises/new"
                element={<NewExercisePage handleCreate={handleCreate} />}
              />
              <Route
                path="/exercises/:exercise_id"
                element={<ExerciseShowPage />}
              />
              <Route
                path="/exercises/:exercise_id/edit"
                element={<ExerciseUpdatePage />}
              />
              <Route path="/workoutPlans" element={<WorkoutPlanListPage />} />
              <Route
                path="/workoutPlans/:workoutPlanId"
                element={<WorkoutPlanShowPage />}
              />
              <Route
                path="/workoutPlans/new"
                element={
                  <NewWorkoutPlanPage handleCreate={handleCreateWorkoutPlan} />
                }
              />
              <Route
                path="/workoutPlans/:workoutPlanId/edit"
                element={<WorkoutPlanpdatePage />}
              />
              <Route path="/progress" element={<ProgressReportPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage setUser={setUser} />} />
              <Route
                path="/signup"
                element={<SignUpPage setUser={setUser} />}
              />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </section>
    </main>
  );
}

export default App;
