import React, { useState, useEffect } from 'react';
import { useTodosContext } from '../hooks/useTodosContext';
import { useAuthContext } from '../hooks/useAuthContext';
import TodoDetails from '../components/TodoDetails';
import TodoForm from '../components/TodoForm';

const Home = () => {
    const { todos, dispatch } = useTodosContext();
    const { user } = useAuthContext();
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchTodos = async () => {
            const response = await fetch('/api/todos', {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
            });

            const json = await response.json();

            if (response.ok) {
                dispatch({ type: 'SET_TODOS', payload: json });
            }
        };

        if (user) {
            fetchTodos();
        }
    }, [dispatch, user]);

    // Filter the todos based on the search query
    const filteredTodos = todos ? todos.filter(todo => 
        todo.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];

    return (
        <div className="home">
            <div className="todos">
                {/* Search input */}
                <input
                    type="text"
                    placeholder="Search Tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {/* Display filtered todos */}
                {filteredTodos.map((todo) => (
                    <TodoDetails key={todo._id} todo={todo} />
                ))}
            </div>
            <TodoForm />
        </div>
    );
};

export default Home;
