import React, { useState } from 'react';
import TodoForm from './pages/TodoForm';
import TodoItem from './pages/TodoItem';
import EditTodoForm from './pages/edittodos'; 

function App() {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);

  
  const addTodo = (task) => {
    // Spread the current todos and add the new todo with a unique ID and 'completed' status
    setTodos([...todos, { ...task, id: Date.now(), completed: false }]);
  };
  
  const deleteTodo = (id) => {
    // Filter out the todo with the matching ID
    setTodos(todos.filter(todo => todo.id !== id));
  };


  const completeTodo = (id) => {
    // Map through todos and mark the matching todo as completed
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: true } : todo
    ));
  };

  const startEditingTodo = (todo) => {
    setEditingTodo(todo);
  };


  const saveEditedTodo = (editedTask) => {
    // Map through todos and replace the edited todo with the updated task
    setTodos(todos.map(todo =>
      todo.id === editedTask.id ? editedTask : todo
    ));
    // Reset editingTodo to close the edit form
    setEditingTodo(null);
  };

  // Close the edit form without saving
  const cancelEditing = () => {
    setEditingTodo(null); 
  };

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center">
      {/* TodoForm component for adding new todos */}
      <div className="w-full max-w-md p-8 bg-gray-300 rounded-lg shadow-lg text-center mt-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Add ToDos</h1>
        <TodoForm addTodo={addTodo} />
      </div>

      {/* Display the list of todos */}
      <div className="w-full max-w-md p-8 bg-gray-700 rounded-lg shadow-lg text-center mt-10">
        <h1 className="text-3xl font-bold text-gray-200 mb-6">
          {todos.length > 0 ? 'Added ToDos' : 'Empty Todos'}
        </h1>
        {/* If there are todos, render them; otherwise, show a message */}
        {todos.length > 0 ? (
          todos.map(todo => (
            <TodoItem
              key={todo.id}
              task={todo}
              onComplete={() => completeTodo(todo.id)}
              onDelete={() => deleteTodo(todo.id)}
              onEdit={() => startEditingTodo(todo)}
            />
          ))
        ) : (
          <p className="text-gray-400">You have no todos yet. Add some to get started!</p>
        )}
      </div>

      {/* Render EditTodoForm in a popup if needed*/}
      {editingTodo && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg w-full max-w-md">
            <EditTodoForm
              task={editingTodo}
              onSave={saveEditedTodo}
              onCancel={cancelEditing}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
