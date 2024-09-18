import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import workoutPlansService from '../../services/workoutPlansService';

const WorkoutPlanUpdatePage = () => {
    const { workoutPlan_id } = useParams();
    const [formData, setFormData] = useState({
        planName: '',
        goalDescription: '',
        targetValue: '',
        currentValue: '',
        deadline: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchWorkoutPlan() {
            try {
                const workoutPlan = await workoutPlansService.show(workoutPlan_id);
                setFormData({
                    planName: workoutPlan.planName,
                    goalDescription: workoutPlan.goalDescription,
                    targetValue: workoutPlan.targetValue,
                    currentValue: workoutPlan.currentValue,
                    deadline: workoutPlan.deadline
                });
            } catch (error) {
                console.error('Error fetching workout plan:', error);
            }
        }
        fetchWorkoutPlan();
    }, [workoutPlan_id]);

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            await workoutPlansService.update(workoutPlan_id, formData);
            navigate(`/workoutPlans/${workoutPlan_id}`);
        } catch (error) {
            console.error('Error updating workout plan:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Plan Name</label>
            <input
                type="text"
                name="planName"
                value={formData.planName}
                onChange={handleChange}
            />
            <label>Goal Description</label>
            <input
                type="text"
                name="goalDescription"
                value={formData.goalDescription}
                onChange={handleChange}
            />
            <label>Target Value</label>
            <input
                type="number"
                name="targetValue"
                value={formData.targetValue}
                onChange={handleChange}
            />
            <label>Current Value</label>
            <input
                type="number"
                name="currentValue"
                value={formData.currentValue}
                onChange={handleChange}
            />
            <label>Deadline</label>
            <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
            />
            <button type="submit">Update Workout Plan</button>
        </form>
    );
};

export default WorkoutPlanUpdatePage;