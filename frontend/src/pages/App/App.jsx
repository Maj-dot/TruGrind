import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getUser } from '../../services/authService';
import '../App/App.css';
import Navbar from '../../components/NavBar/NavBar';
import HomePage from '../HomePage/HomePage';
import DashboardPage from '../DashboardPage/DashboardPage';
import PostListPage from '../PostListPage/PostListPage';
import NewPostPage from '../NewPostPage/NewPostPage';
import SignUpPage from '../SignUpPage/SignUpPage';
import LoginPage from '../LogInPage/LogInPage';

function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main id="react-app">
      <Navbar user={user} setUser={setUser} />
      <section id="main-section">
        <Routes>
          {user ? (           
            <>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/posts" element={<PostListPage />} />
              <Route path="/posts/new" element={<NewPostPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            
            <>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage setUser={setUser} />} />
              <Route path="/signup" element={<SignUpPage setUser={setUser} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </section>
    </main>
  );
}

export default App;
