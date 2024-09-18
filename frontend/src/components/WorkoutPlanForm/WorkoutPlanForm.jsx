import { useState, useEffect } from "react";

const WorkoutPlanForm = (props) => {
  const [formData, setFormData] = useState({
    planName: "",
    goalDescription: "",
    targetValue: "",
    currentValue: "",
    deadline: "",
    exercises: [],
  });

  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    async function fetchExercises() {
      try {
        const token = localStorage.getItem('token'); 
        const response = await fetch('/api/exercises', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
          },
        });
  
        if (!response.ok) {
          throw new Error('Unauthorized access');
        }
  
        const data = await response.json();
        console.log('Fetched exercises:', data);
        setExercises(data);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    }
  
    fetchExercises();
  }, []);

  const handleChange = (evt) => {
    const { name, value, options } = evt.target;
    if (name === "exercises") {
      const selectedValues = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);
      setFormData({ ...formData, [name]: selectedValues });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log("Form submitted!");
    props.handleCreate(formData);
    console.log("handleCreate called with", formData);
  };

  return (
    <main>
      <div className="workoutPlan-form-container">
        <form className="workoutPlan-form" onSubmit={handleSubmit}>
          <label htmlFor="planName_input">Plan Name</label>
          <input
            type="text"
            id="planName_input"
            name="planName"
            value={formData.planName}
            onChange={handleChange}
          />
          <label htmlFor="goalDescription_input">Goal Description</label>
          <textarea
            id="goalDescription_input"
            name="goalDescription"
            value={formData.goalDescription}
            onChange={handleChange}
          />
          <label htmlFor="targetValue_input">Target Value</label>
          <input
            type="number"
            id="targetValue_input"
            name="targetValue"
            value={formData.targetValue}
            onChange={handleChange}
          />
          <label htmlFor="currentValue_input">Current Value</label>
          <input
            type="number"
            id="currentValue_input"
            name="currentValue"
            value={formData.currentValue}
            onChange={handleChange}
          />
          <label htmlFor="deadline_input">Deadline</label>
          <input
            type="date"
            id="deadline_input"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
          />
          <label htmlFor="exercises_input">Select Exercise</label>
          <select
            id="exercises_input"
            name="exercises"
            value={formData.exercises}
            onChange={handleChange}
            multiple
          >
            <option value="" disabled>
              --Select exercises--
            </option>
            {Array.isArray(exercises) &&
              exercises.map((exercise) => (
                <option key={exercise._id} value={exercise._id}>
                  {exercise.type}{" "}
                  {/* Adjust this if you want to show a different property */}
                </option>
              ))}
          </select>
          <button type="submit">Create Workout Plan</button>
        </form>
      </div>
    </main>
  );
};

export default WorkoutPlanForm;
