import React, { useState } from 'react';

const TodoForm = ({ addTodo }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            addTodo({ text, completed: false });
            setText('');
        }
    };

    return (
      <form onSubmit={handleSubmit} className="flex mb-4">
          <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Add a new todo"
              className="flex-grow p-4 border border-gray-300 rounded-l-md "
          />
          <button type="submit" className="bg-green-500 text-white p-4 rounded-r-md hover:bg-green-600 transition duration-200">
              Add
          </button>
      </form>
  );
};

export default TodoForm;
