import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTodosContext } from '../hooks/useTodosContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { FaTrashAlt, FaEdit, FaEye } from 'react-icons/fa';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const TodoDetails = ({ todo }) => {
    const { dispatch } = useTodosContext();
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const [confirmationMessage, setConfirmationMessage] = useState('');

    // Handle delete action
    const handleDelete = async () => {
        if (!user) {
            return;
        }
        
        // Use dispatch to delete the todo from context
        const response = await fetch(`/api/todos/${todo._id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`,
            },
        });

        const json = await response.json();

        if (response.ok) {
            dispatch({ type: 'DELETE_TODO', payload: json });
        }
    };

    // Handle edit action
    const handleEdit = () => {
        navigate(`/edit-todo/${todo._id}`);
    };

    // Handle view action
    const handleView = () => {
        navigate(`/view-todo/${todo._id}`);
    };

    // Handle task completion toggle
    const handleCheckboxChange = async () => {
        if (!user) {
            return;
        }

        // Toggle the completed status of the task
        const updatedTodo = { ...todo, completed: !todo.completed };

        // Send a PATCH request to update the task's completion status
        const response = await fetch(`/api/todos/${todo._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`,
            },
            body: JSON.stringify(updatedTodo),
        });

        const json = await response.json();

        if (response.ok) {
            // Dispatch an action to update the todo in the context
            dispatch({ type: 'UPDATE_TODO', payload: json });

            // Set confirmation message when the task is marked as complete
            if (updatedTodo.completed) {
                setConfirmationMessage('Task  complete!');
            } else {
                // Clear the confirmation message when the task is marked as incomplete
                setConfirmationMessage('');
            }
        }
    };

    return (
        <div className={`todo-details ${todo.completed ? 'completed' : ''}`}>
            <div className="todo-header">
                {/* Checkbox for marking the task as completed */}
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={handleCheckboxChange}
                />
                <h4 className={todo.completed ? 'completed' : ''}>{todo.title}</h4>
            </div>
            <p><strong>Description:</strong> <br />{todo.description}</p>
            <p>{formatDistanceToNow(new Date(todo.createdAt), { addSuffix: true })}</p>
            <div className="actions">
                <button className="delete-btn" onClick={handleDelete}>
                    <FaTrashAlt className="icon" /> Delete
                </button>
                <button className="edit-btn" onClick={handleEdit}>
                    <FaEdit className="icon" /> Edit
                </button>
                <button className="view-btn" onClick={handleView}>
                    <FaEye className="icon" /> View
                </button>
            </div>
            {/* Display confirmation message */}
            {confirmationMessage && (
                <p className="confirmation-message">{confirmationMessage}</p>
            )}
        </div>
    );
};

export default TodoDetails;
