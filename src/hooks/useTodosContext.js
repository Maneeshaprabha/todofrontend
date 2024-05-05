import { TodosContext } from "../context/TodoContext";
import { useContext } from 'react';

export const useTodosContext = () => {
    const context = useContext(TodosContext);
    if (!context) {
        throw new Error('useTodosContext must be used inside a TodosContextProvider');
    }

    return context;
};
