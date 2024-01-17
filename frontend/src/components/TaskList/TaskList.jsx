import { useState, useEffect } from 'react';
import AddTaskBar from '../AddTaskBar/AddTaskBar';
import './TaskList.css';
const herokuBackendUrl = 'https://react-app-server-eiuz5vmkl-areeb610.vercel.app';


const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${herokuBackendUrl}/tasks`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleTaskClick = (taskId) => {
    setSelectedTask((prevSelectedTask) => (prevSelectedTask === taskId ? null : taskId));
  };

  const handleDeleteClick = async (taskId) => {
    try {
      const response = await fetch(`${herokuBackendUrl}/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // If the task is successfully deleted, fetch tasks again to reflect changes
        fetchTasks();
      } else {
        console.error('Failed to delete task:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleCompleteClick = async (taskId) => {
    try {
      const response = await fetch(`${herokuBackendUrl}tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: true,
        }),
      });

      if (response.ok) {
        // If the task is successfully marked as completed, fetch tasks again to reflect changes
        fetchTasks();
      } else {
        console.error('Failed to mark task as completed:', response.statusText);
      }
    } catch (error) {
      console.error('Error marking task as completed:', error);
    }
  };

  const handleAddTask = async (newTaskDescription) => {
    try {
      const response = await fetch( `${herokuBackendUrl}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: newTaskDescription,
          completed: false,
        }),
      });

      if (response.ok) {
        // If the task is successfully added, fetch tasks again to reflect changes
        fetchTasks();
      } else {
        console.error('Failed to add task:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const formatDateTime = (dateTimeString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleString('en-US', options).replace(',', ' ');
  };

  return (
    <div>
      <AddTaskBar onAddTask={handleAddTask} />
      <div className='task-list'>
        {tasks.map((task) => (
          <div key={task._id} className={`task-item ${selectedTask === task._id ? 'selected' : ''}`}>
            <span
              onClick={() => handleTaskClick(task._id)}
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                cursor: 'pointer',
              }}
            >
              {task.description}
            </span>
            {selectedTask === task._id && (
              <div className='task-details'>
                <span>Created at: {formatDateTime(task.createdAt)}</span>
                <span>Status: {task.completed ? 'Completed' : 'Pending'}</span>
                <button className='Mark-as-Completed' onClick={() => handleCompleteClick(task._id)}>
                  Mark as Completed
                </button>
                <button className='delete-button' onClick={() => handleDeleteClick(task._id)}>
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
