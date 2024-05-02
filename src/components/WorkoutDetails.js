import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { FaTrashAlt, FaEdit } from 'react-icons/fa'; // Import icons

// date-fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  // Handle delete action
  const handleDelete = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(`/api/workouts/${workout._id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json });
    }
  };

  // Handle edit action
  const handleEdit = () => {
    navigate(`/edit-workout/${workout._id}`);
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      
      <p><strong>Description: </strong> <br></br>{workout.description}</p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <div className="actions">
        {/* Delete button */}
        <button className="delete-btn" onClick={handleDelete}>
          <FaTrashAlt className="icon" /> Delete
        </button>
        {/* Edit button */}
        <button className="edit-btn" onClick={handleEdit}>
          <FaEdit className="icon" /> Edit
        </button>
      </div>
    </div>
  );
};

export default WorkoutDetails;
