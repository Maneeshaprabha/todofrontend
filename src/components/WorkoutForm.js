import { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState('');
  
  const [description, setDescription] = useState(''); // New state variable for description
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in');
      return;
    }

    // Add description to the workout object
    const workout = { title,  description };

    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setTitle('');
   
      setDescription(''); // Reset the description state
      setError(null);
      setEmptyFields([]);
      dispatch({ type: 'CREATE_WORKOUT', payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Task</h3>

      <label>Task:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

    

      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className={`description-input ${emptyFields.includes('description') ? 'error' : ''}`}
        placeholder="Enter a description here..."
        style={{
          padding: '10px',
          border: emptyFields.includes('description') ? '1px solid var(--error)' : '1px solid #ccc',
          borderRadius: '4px',
          width: '100%',
          resize: 'vertical'
        }}
      />


      <button>Add Task</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
