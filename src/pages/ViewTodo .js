import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewTodo = () => {
    const { id } = useParams(); // Retrieve the todo ID from the URL
    const [todo, setTodo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch the todo details using the todo ID
        axios.get(`/api/todos/${id}`)
            .then(response => {
                setTodo(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    if (!todo) {
        return <p>Todo not found</p>;
    }

    return (
        <div className="view-todo">
            <h1>{todo.title}</h1>
            <p><strong>Description:</strong> {todo.description}</p>
            <p><strong>Created:</strong> {new Date(todo.createdAt).toLocaleString()}</p>
            {/* Add other todo details here */}
        </div>
    );
};

export default ViewTodo;
