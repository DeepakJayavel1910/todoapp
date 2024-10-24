import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
const apiUrl = import.meta.env.APIURL;

const App = () => {
    const [todos, setTodos] = useState([]);
    useEffect(() => {
        const fetchTodos = async () => {
            const response = await axios.get(`${apiUrl}/todos`);
            setTodos(response.data);
        };
        fetchTodos();
    }, []);

    const addTodo = async (newTodo) => {
        try {
            const response = await axios.post(`${apiUrl}/todos`, newTodo);
            setTodos([...todos, response.data]);
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`${apiUrl}/todos/${id}`);
            setTodos(todos.filter(todo => todo._id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const toggleComplete = async (id, completed) => {
        try {
            const response = await axios.patch(`${apiUrl}/todos/${id}`, { completed: !completed });
            setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    return (
      <div className="min-h-screen bg-gradient-to-r from-[#4EA571] to-[#CEFF1A] flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
              <h1 className="text-3xl font-bold mb-6 text-center text-black">Todo App</h1>
              <TodoForm addTodo={addTodo} />
              <TodoList todos={todos} deleteTodo={deleteTodo} toggleComplete={toggleComplete} />
          </div>
      </div>
  );
};

export default App;
