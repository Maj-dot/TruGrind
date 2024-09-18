import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import workoutPlansService from '../../services/workoutPlansService';

export default function WorkoutPlanShowPage() {
    const { workoutPlan_id } = useParams();
    const [workoutPlan, setWorkoutPlan] = useState(null);

    useEffect(() => {
        async function fetchWorkoutPlan() {
            try {
                const fetchedWorkoutPlan = await workoutPlansService.show(workoutPlan_id);
                setWorkoutPlan(fetchedWorkoutPlan);
            } catch (err) {
                console.error('Error fetching exerice:', err);
            }
        }
        fetchWorkoutPlan();
    }, [workoutPlan_id]);

    if (!workoutPlan) return <p>Loading...</p>

    return (
        <main>
            <div className="workoutPlan-card">
                <article>
                <header>
                    <h2>{workoutPlan.workoutPlan_id}</h2>
                </header>
                <p>planName: {workoutPlan.planName}</p>
                <p>goalDescription: {workoutPlan.goalDescription}</p>
                <p>targetValue: {workoutPlan.targetValue}</p>
                <p>currentValue: {workoutPlan.currentValue}</p>
                <p>deadline: {workoutPlan.deadline}</p>
                <p>exercises: {workoutPlan.exercises}</p>
                </article>
                <Link to="/workoutPlans/">Back to Workout Plans</Link>
            </div>
        </main>
    )
}