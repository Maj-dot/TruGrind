import ExerciseForm from '../../components/ExerciseForm/ExerciseForm';
import { create } from '../../services/exercisesService'

export default function NewExercisePage() {
  function handleCreate(exerciseForm) {
    console.log('Data passed to create function:', exerciseForm);
    create(exerciseForm);
  }
  return (
    <div>
      <h1>Add A Grind!</h1>
      <ExerciseForm handleCreate={handleCreate} />
    </div>
  );
};
