import React, { useState } from 'react';
import { useTodosContext } from '../hooks/useTodosContext';
import TodoDetails from './TodoDetails';

const TodosList = () => {
    const { todos } = useTodosContext();
    const [searchQuery, setSearchQuery] = useState('');

    // Filter todos based on search query
    const filteredTodos = todos.filter((todo) =>
        todo.task.toLowerCase().includes(searchQuery.toLowerCase()) ||
        todo.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="todos-list">
            {/* Search input */}
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search todos..."
                style={{
                    padding: '10px',
                    marginBottom: '20px',
                    width: '100%',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    boxSizing: 'border-box',
                }}
            />

            {/* Render filtered todos */}
            {filteredTodos.map((todo) => (
                <TodoDetails key={todo._id} todo={todo} />
            ))}
        </div>
    );
};

export default TodosList;
