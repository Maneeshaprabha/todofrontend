import { useState } from 'react';
import { useTodosContext } from '../hooks/useTodosContext';
import { useAuthContext } from '../hooks/useAuthContext';

const TodoForm = () => {
    const { dispatch } = useTodosContext();
    const { user } = useAuthContext();

    const [task, setTask] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError('You must be logged in');
            return;
        }

        // Create a todo object
        const todo = { task, description };

        // POST request to create a new todo
        const response = await fetch('/api/todos', {
            method: 'POST',
            body: JSON.stringify(todo),
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
            setTask('');
            setDescription('');
            setError(null);
            setEmptyFields([]);
            dispatch({ type: 'CREATE_TODO', payload: json });
        }
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Todo</h3>

            <label>Task:</label>
            <input
                type="text"
                onChange={(e) => setTask(e.target.value)}
                value={task}
                className={emptyFields.includes('task') ? 'error' : ''}
            />

            <label htmlFor="description">Description:</label>
            <textarea
                id="description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className={emptyFields.includes('description') ? 'error' : ''}
                placeholder="Enter a description here..."
                style={{ padding: '10px', border: emptyFields.includes('description') ? '1px solid var(--error)' : '1px solid #ccc', borderRadius: '4px', width: '100%', resize: 'vertical' }}
            />

            <button type="submit">Add Todo</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default TodoForm;
