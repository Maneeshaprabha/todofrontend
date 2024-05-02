import React, { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import WorkoutDetails from './WorkoutDetails';

const WorkoutsList = () => {
    const { workouts } = useWorkoutsContext();
    const [searchQuery, setSearchQuery] = useState('');

    // Filter workouts based on search query
    const filteredWorkouts = workouts.filter((workout) =>
        workout.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        workout.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="workouts-list">
            {/* Search input */}
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search workouts..."
                style={{
                    padding: '10px',
                    marginBottom: '20px',
                    width: '100%',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    boxSizing: 'border-box',
                }}
            />

            {/* Render filtered workouts */}
            {filteredWorkouts.map((workout) => (
                <WorkoutDetails key={workout._id} workout={workout} />
            ))}
        </div>
    );
};

export default WorkoutsList;
