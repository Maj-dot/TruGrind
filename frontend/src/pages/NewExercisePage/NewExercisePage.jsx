import ExerciseForm from '../../components/ExerciseForm/ExerciseForm';
import { create } from '../../services/exercisesService'
import { useNavigate } from 'react-router-dom';

export default function NewExercisePage() {
  const navigate = useNavigate();

  function handleCreate(exerciseForm) {
    console.log('Data passed to create function:', exerciseForm);
    create(exerciseForm);
    navigate('/exercises');
  }
  return (
    <div>
      <h1>Add A Grind!</h1>
      <ExerciseForm handleCreate={handleCreate} />
    </div>
  );
};
