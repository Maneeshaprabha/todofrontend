import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const EditWorkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { dispatch } = useWorkoutsContext();

  const [workout, setWorkout] = useState(null);
  const [title, setTitle] = useState('');

  const [description, setDescription] = useState(''); // Add state variable for description
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the workout details
    const fetchWorkout = async () => {
      const response = await fetch(`/api/workouts/${id}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (response.ok) {
        setWorkout(json);
        setTitle(json.title);
     

        setDescription(json.description); // Fetch and set description
      } else {
        setError('Failed to fetch workout details.');
      }
    };

    if (user) {
      fetchWorkout();
    }
  }, [id, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in.');
      return;
    }

    const updatedWorkout = { title,  description }; // Include description in the update

    const response = await fetch(`/api/workouts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedWorkout),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    } else {
      // Update the workout in the context
      dispatch({ type: 'UPDATE_WORKOUT', payload: json });
      // Navigate back to the home page
      navigate('/');
    }
  };

  if (!workout) {
    return <div>Loading...</div>;
  }

  return (
    <form className="edit-workout" onSubmit={handleSubmit}>
      <h3>Edit Task</h3>

      <label>Task:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />



      {/* Add a textarea for the description */}
      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        onChange={(e) => setDescription(e.target.value)}
        value={description}

        placeholder="Enter a description here..."
        style={{
          padding: '10px',

          borderRadius: '4px',
          width: '100%',
          resize: 'vertical'
        }}
      />


      <button type="submit">Save Changes</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default EditWorkout;
