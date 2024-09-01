import React, { useState } from 'react';
import ConfirmationPopup from '../Components/comformation'; 

const TodoItem = ({ task, onComplete, onDelete, onEdit }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    onDelete(); // Call the onDelete function passed as a prop
    setShowConfirmation(false); // Hide the confirmation popup
  }

  const handleCancelDelete = () => {
    setShowConfirmation(false); // Hide the confirmation popup
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-4 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl mx-auto">
      <h2 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>
        {task.name}
      </h2>
      <p className={`${task.completed ? 'line-through text-gray-500' : 'text-gray-400'} text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl`}>
        {task.description}
      </p>
      <p className={`${task.completed ? 'text-gray-500' : 'text-gray-400'} text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl`}>
        {new Date(task.date).toLocaleDateString()}
      </p>
      <div className="flex flex-col sm:flex-row justify-center items-center mt-4 space-y-2 sm:space-y-0 sm:space-x-2">
        <button
          onClick={onComplete}
          className="bg-green-500 text-white py-1 px-3 sm:px-4 rounded-lg hover:bg-green-600 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
        >
          Complete
        </button>
        <button
          onClick={handleDeleteClick} // Show confirmation popup on delete
          className="bg-red-500 text-white py-1 px-6 sm:px-4 rounded-lg hover:bg-red-600 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
        >
          Delete
        </button>
        <button
          onClick={onEdit}
          className="bg-blue-500 text-white py-1 px-8 sm:px-4 rounded-lg hover:bg-blue-600 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
        >
          Edit
        </button>
      </div>

      {/* Render the confirmation popup if showConfirmation is true */}
      {showConfirmation && (
        <ConfirmationPopup
          message="Are you sure  to delete this task?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default TodoItem;
