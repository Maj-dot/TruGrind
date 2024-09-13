export default function HomePage() {
  return (
    <div className="home-container">
      <header className="hero">
        <h1>Welcome To TruGrind!</h1>
        <p>Your ultimate fitness tracker to log workouts, set goals, and track progress!</p>
        <button className="cta-button">Sign Up Now!</button>
      </header>

      <section className="features">
        <h2>Features</h2>
        <div className="feature-list">
          <div className="feature-item">
            <h3>Log Workouts</h3>
            <p>Easily track your workouts and monitor your progress over time.</p>
          </div>
          <div className="feature-item">
            <h3>Set Fitness Goals</h3>
            <p>Define your goals and let TruGrind guide you towards achieving them.</p>
          </div>
          <div className="feature-item">
            <h3>Track Progress</h3>
            <p>See your improvements with progress tracking and reports.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>Already hane an account? <a href="/login">Log In</a></p>
      </footer>
    </div>
  );
}
