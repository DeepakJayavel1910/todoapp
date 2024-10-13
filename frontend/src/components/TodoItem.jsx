import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const TodoItem = ({ todo, deleteTodo, toggleComplete }) => {
  return (
    <div className="flex items-center justify-between p-4 border border-gray-300 rounded-md bg-gray-50 shadow-sm">
        <span
            onClick={() => toggleComplete(todo._id, todo.completed)}
            className={`cursor-pointer ${todo.completed ? 'line-through text-gray-500' : ''}`}
        >
            {todo.text}
        </span>
        <button
            onClick={() => deleteTodo(todo._id)}
            className="text-red-500 hover:text-red-700 transition duration-200"
        >
            Delete
        </button>
    </div>
);
};

export default TodoItem;
