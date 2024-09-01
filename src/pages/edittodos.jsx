import React, { useState, useEffect } from 'react';
import ConfirmationPopup from '../Components/comformation';

const EditTodoForm = ({ task, onSave, onCancel }) => {

  const [formState, setFormState] = useState({
    editedTask: { ...task },
    error: '',
    showConfirmation: false,
  });

  // useEffect to reset editedTask state whenever the task prop changes
  useEffect(() => {
    setFormState((prevState) => ({
      ...prevState,
      editedTask: { ...task },
    }));
  }, [task]);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      editedTask: {
        ...prevState.editedTask,
        [name]: value,
      },
    }));

    // Validate date input
    if (name === 'date') {
      const selectedDate = new Date(value);
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0); // Set time to start of the day for comparison

      if (selectedDate < currentDate) {
        setFormState((prevState) => ({
          ...prevState,
          error: 'Past dates are not acceptable',
        }));
      } else {
        setFormState((prevState) => ({
          ...prevState,
          error: '',
        }));
      }
    }
  };

  
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const selectedDate = new Date(formState.editedTask.date);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (selectedDate < currentDate) {
      setFormState((prevState) => ({
        ...prevState,
        error: 'Past dates are not acceptable',
      }));
      return;
    }

    setFormState((prevState) => ({
      ...prevState,
      showConfirmation: true,
    }));
  };


  const handleConfirmUpdate = () => {
    onSave(formState.editedTask); // Call the onSave function passed as a prop to update the task
    setFormState((prevState) => ({
      ...prevState,
      showConfirmation: false,
    }));
    alert('Task edited'); 
  };

  // Cancel the update and hide the confirmation popup
  const handleCancelUpdate = () => {
    setFormState((prevState) => ({
      ...prevState,
      showConfirmation: false,
    }));
  };

  return (
    <div className="bg-gray-700 p-6 rounded-lg shadow-lg max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl w-full mx-auto">
      {/* Form for editing a task */}
      <form onSubmit={handleSubmit}>
        {/* Name field */}
        <div className="mb-4">
          <label className="block text-white mb-2 text-sm sm:text-base md:text-lg">Name</label>
          <input
            type="text"
            name="name"
            value={formState.editedTask.name}
            onChange={handleChange}
            className="w-full p-2 rounded-lg text-xs sm:text-sm md:text-base"
            placeholder="Enter task name"
            required
          />
        </div>
        
        {/* Description field */}
        <div className="mb-4">
          <label className="block text-white mb-2 text-sm sm:text-base md:text-lg">Description</label>
          <input
            type="text"
            name="description"
            value={formState.editedTask.description}
            onChange={handleChange}
            className="w-full p-2 rounded-lg text-xs sm:text-sm md:text-base"
            placeholder="Enter task description"
            required
          />
        </div>
        
        {/* Date field */}
        <div className="mb-4">
          <label className="block text-white mb-2 text-sm sm:text-base md:text-lg">Date</label>
          <input
            type="date"
            name="date"
            value={formState.editedTask.date}
            onChange={handleChange}
            className="w-full p-2 rounded-lg text-xs sm:text-sm md:text-base"
            required
          />
        </div>
        
        {/* Display error message if there is any */}
        {formState.error && <p className="text-red-500 mb-4 text-xs sm:text-sm md:text-base">{formState.error}</p>}
        
        {/* Buttons for submitting the form or canceling the edit */}
        <div className="flex flex-col sm:flex-row mt-4">
          <button
            type="submit"
            className={`bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 mb-2 sm:mb-0 sm:mr-2 text-xs sm:text-sm md:text-base ${formState.error ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={formState.error} // Disable button if there is an error
          >
            Update
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 text-xs sm:text-sm md:text-base"
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Confirmation popup component */}
      {formState.showConfirmation && (
        <ConfirmationPopup
          message="Are you sure to update this task?"
          onConfirm={handleConfirmUpdate}
          onCancel={handleCancelUpdate}
        />
      )}
    </div>
  );
};

export default EditTodoForm;
