import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, deleteTodo, toggleComplete }) => {
  return (
    <div className="space-y-4">
        {todos.map(todo => (
            <TodoItem
                key={todo._id}
                todo={todo}
                deleteTodo={deleteTodo}
                toggleComplete={toggleComplete}
            />
        ))}
    </div>
);
};

export default TodoList;
