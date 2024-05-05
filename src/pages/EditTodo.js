import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useTodosContext } from '../hooks/useTodosContext';

const EditTodo = () => {
    const { id } = useParams(); // Retrieve the task ID from the URL
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const { dispatch } = useTodosContext();

    const [todo, setTodo] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch the task details
        const fetchTodo = async () => {
            const response = await fetch(`/api/todos/${id}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
            });

            const json = await response.json();

            if (response.ok) {
                setTodo(json);
                setTitle(json.title);
                setDescription(json.description);
            } else {
                setError('Failed to fetch task details.');
            }
        };

        if (user) {
            fetchTodo();
        }
    }, [id, user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError('You must be logged in.');
            return;
        }

        const updatedTodo = { title, description }; // Updated task

        const response = await fetch(`/api/todos/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(updatedTodo),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`,
            },
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        } else {
            // Update the task in the context
            dispatch({ type: 'UPDATE_TODO', payload: json });
            // Navigate back to the home page
            navigate('/');
        }
    };

    if (!todo) {
        return <div>Loading...</div>;
    }

    return (
        <form className="edit-todo" onSubmit={handleSubmit}>
            <h3>Edit Task</h3>

            <label>Task:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />

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

export default EditTodo;
