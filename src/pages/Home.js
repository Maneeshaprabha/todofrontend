import React, { useState, useEffect } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';

const Home = () => {
    const { workouts, dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts', {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
            });

            const json = await response.json();

            if (response.ok) {
                dispatch({ type: 'SET_WORKOUTS', payload: json });
            }
        };

        if (user) {
            fetchWorkouts();
        }
    }, [dispatch, user]);

    // Filter the workouts based on the search query
    const filteredWorkouts = workouts ? workouts.filter(workout => 
        workout.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];

    return (
        <div className="home">
            <div className="workouts">
                {/* Search input */}
                <input
                    type="text"
                    placeholder="Search Tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {/* Display filtered workouts */}
                {filteredWorkouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
            <WorkoutForm />
        </div>
    );
};

export default Home;
