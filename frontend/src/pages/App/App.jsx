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
import HomePage from "../HomePage/HomePage";
import DashboardPage from "../DashboardPage/DashboardPage";
import NewExercisePage from "../NewExercisePage/NewExercisePage";
import ExerciseListPage from "../ExerciseListPage/ExerciseListPage";
import ExerciseShowPage from "../ExerciseShowPage/ExerciseShowPage";
import ExerciseUpdatePage from "../ExerciseUpdatePage/ExerciseUpdatePage";

function App() {
  const [user, setUser] = useState(getUser());
  const [exercises, setExercises] = useState([]);
  const navigate = useNavigate();

  const handleCreate = async (exerciseForm) => {
    const newExercise = await exercisesService.create(exerciseForm);
    setExercises([newExercise, ...exercises]);
    navigate("/exercises");
  };

  useEffect(() => {
    const fetchAllExercises = async () => {
      const exerciseData = await exercisesService.index();
      console.log("Fetched exercises:", exerciseData);
      setExercises(exerciseData);
    };
    fetchAllExercises();
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
              <Route path="/exercises/:exercise_id/edit" element={<ExerciseUpdatePage />} />
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
