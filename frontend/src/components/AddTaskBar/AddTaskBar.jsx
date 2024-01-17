import { useState } from 'react';
import proptypes from 'prop-types';
import PlusIcon from '../../assets/icons/PlusIcon';
import './AddTaskBar.css';

AddTaskBar.propTypes = {
    onAddTask: proptypes.func.isRequired,
    };

function AddTaskBar({ onAddTask }) {
  const [newTaskDescription, setNewTaskDescription] = useState('');

  const handleInputChange = (event) => {
    setNewTaskDescription(event.target.value);
  };

  const handleAddTask = () => {
    if (newTaskDescription.trim() !== '') {
      onAddTask(newTaskDescription);
      setNewTaskDescription('');
    }
  };

  return (
    <div className='add-task-bar'>
      <input
        className='add-task-input'
        placeholder='Add a task...'
        value={newTaskDescription}
        onChange={handleInputChange}
      />
      <button className='add-task-button' onClick={handleAddTask}>
        <PlusIcon />
      </button>
    </div>
  );
}

export default AddTaskBar;
