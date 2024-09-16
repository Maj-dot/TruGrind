import { useState } from "react";

const ExerciseForm = (props) => {
  const [formData, setFormData] = useState({
    exercise_id: "",
    type: "",
    duration: "",
    weight: "",
    reps: "",
    sets: "",
    date: "",
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.prventDefault();
    props.handleCreate(formData);
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label htmlFor="exercise_id-input">Exercise</label>
        <input
          required
          type="text"
          name="exercise_id"
          id="exercise_id-input"
          value={formData.exercise_id}
          onChange={handleChange}
        />
        <label htmlFor="type-input">Type</label>
        <select
          required
          name="type"
          id="type-input"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="Cardio">Cardio</option>
          <option value="Strength">Strength</option>
          <option value="Flexibility">Flexibility</option>
          <option value="Core">Core</option>
          <option value="HIIT">HIIT</option>
          <option value="Balance & Stability">Balance & Stability</option>
          <option value="Mobility Workouts">Mobility Workouts</option>
        </select>
        <label htmlFor="duration-input">Duration</label>
        <select
          required
          name="duration"
          id="duration-input"
          value={formData.duration}
          onChange={handleChange}
        >
          <option value="5">5 Mins</option>
          <option value="10">10 Mins</option>
          <option value="15">15 Mins</option>
          <option value="20">20 Mins</option>
          <option value="25">25 Mins</option>
          <option value="30">30 Mins</option>
          <option value="35">35 Mins</option>
          <option value="40">40 Mins</option>
          <option value="45">45 Mins</option>
          <option value="50">50 Mins</option>
          <option value="55">55 Mins</option>
          <option value="60">60 Mins</option>
        </select>
        <label htmlFor="weight-input">Weight</label>
        <input
          type="text"
          name="weight"
          id="weight-input"
          value={formData.weight}
          onChange={handleChange}
        />
        <label htmlFor="reps-input">Reps</label>
        <input
          type="number"
          name="reps"
          id="reps-input"
          value={formData.reps}
          onChange={handleChange}
        />
        <label htmlFor="sets-input">Sets</label>
        <input
          type="number"
          name="sets"
          id="sets-input"
          value={formData.sets}
          onChange={handleChange}
        />
        <label htmlFor="date-input">Date</label>
        <input
          type="date"
          name="date"
          id="date-input"
          value={formData.date}
          onChange={handleChange}
        />
      </form>
      <button type="submit">Let's Grind!</button>
    </main>
  );
};

export default ExerciseForm;
