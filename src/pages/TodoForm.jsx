import React, { useState } from 'react';

const TodoForm = ({ addTodo }) => {
  // a single state object
  const [formState, setFormState] = useState({
    task: {
      name: '',
      description: '',
      date: '',
    },
    error: ''
  });

  // Handle changes in the input fields and update the state accordingly
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle date validation within the handleChange function
    let error = '';
    if (name === 'date') {
      const selectedDate = new Date(value);
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0); // Set time to start of the day for comparison

      if (selectedDate < currentDate) {
        error = 'Past dates are not acceptable';
      }
    }

    // Update the state with the new task value and any error
    setFormState((prevState) => ({
      ...prevState,
      task: {
        ...prevState.task,
        [name]: value, // Update the task field corresponding to the input name
      },
      error, // Set or clear the error
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the page from reloading

    const { task, error } = formState;

    // If there's an error, prevent form submission
    if (error) {
      return;
    }

    // Add the new task if everything is valid
    addTodo(task);

    // Reset the form fields after submission
    setFormState({
      task: {
        name: '',
        description: '',
        date: '',
      },
      error: ''
    });
  };

  const { task, error } = formState;

  return (
    <div className="bg-gray-600 p-4 rounded-lg shadow-lg w-full max-w-md mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
      <form onSubmit={handleSubmit}>
        {/* Name field */}
        <div className="mb-4">
          <label className="block text-white mb-2 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={task.name}
            onChange={handleChange}
            className="w-full p-2 rounded-lg text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
            placeholder="Name"
            required
          />
        </div>

        {/* Description field */}
        <div className="mb-4">
          <label className="block text-white mb-2 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={task.description}
            onChange={handleChange}
            className="w-full p-2 rounded-lg text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
            placeholder="Description"
            required
          />
        </div>

        {/* Date field */}
        <div className="mb-4">
          <label className="block text-white mb-2 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={task.date}
            onChange={handleChange}
            className="w-full p-2 rounded-lg text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
            required
          />
        </div>

        {/* Error message */}
        {error && <p className="text-red-500 mb-4 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">{error}</p>}

        {/* Submit button */}
        <button
          type="submit"
          className={`w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-slate-400 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl ${error ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={error} // Disable button if there is an error
        >
          Add Todo
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
