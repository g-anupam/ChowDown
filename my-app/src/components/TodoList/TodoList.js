import React, { useState } from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Select from '../Select/Select';
import Card from '../Card/Card';
import './TodoList.css';

const TodoList = () => {
  const [tasks, setTasks] = useState([
    { 
      id: 1, 
      title: 'Complete React Tutorial',
      description: 'Complete the React tutorial to learn the basics of the library',
      category: 'Learning', 
      dueDate: '2023-05-01', 
      dueTime: '10:00', 
      completed: false 
    },
    {
      id: 2,
      title: 'Go Grocery Shopping',
      description: 'Buy groceries for the week, including fresh produce, meat, and household items',
      category: 'Personal',
      dueDate: '2023-04-28',
      dueTime: '14:30',
      completed: true
    },
    {
      id: 3,
      title: 'Team Meeting',
      description: 'Attend the weekly team meeting to discuss project progress and upcoming deadlines',
      category: 'Work',
      dueDate: '2023-04-30',
      dueTime: '15:00',
      completed: false
    }
  ]);

  const [newTask, setNewTask] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCategory, setNewCategory] = useState('Personal');
  const [newDueDate, setNewDueDate] = useState('');
  const [newDueTime, setNewDueTime] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  const categories = ['Personal', 'Work', 'Learning', 'Shopping'];

  const addTask = (e) => {
    e.preventDefault(); // Prevent form submission
    if (newTask.trim() === '' || newDescription.trim() === '' || newDueDate.trim() === '' || newDueTime.trim() === '') return;

    if (editingTask) {
      setTasks(tasks.map(task => 
        task.id === editingTask.id 
          ? { ...task, title: newTask, description: newDescription, category: newCategory, dueDate: newDueDate, dueTime: newDueTime }
          : task
      ));
      setEditingTask(null);
    } else {
      const newId = Math.max(...tasks.map(t => t.id), 0) + 1;
      setTasks([...tasks, {
        id: newId,
        title: newTask,
        description: newDescription,
        category: newCategory,
        dueDate: newDueDate,
        dueTime: newDueTime,
        completed: false
      }]);
    }
    setNewTask('');
    setNewDescription('');
    setNewCategory('Personal');
    setNewDueDate('');
    setNewDueTime('');
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const startEditing = (task) => {
    setEditingTask(task);
    setNewTask(task.title);
    setNewDescription(task.description);
    setNewCategory(task.category);
    setNewDueDate(task.dueDate);
    setNewDueTime(task.dueTime);
  };

  const cancelEditing = () => {
    setEditingTask(null);
    setNewTask('');
    setNewDescription('');
    setNewCategory('Personal');
    setNewDueDate('');
    setNewDueTime('');
  };
  
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  
  return (
    <Card className="todo-container">
      <h1 className="todo-title">Todo List</h1>
      
      <form className="todo-form" onSubmit={addTask}>
        <Input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter task title"
          className="todo-input"
        />
        <Input
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Enter task description"
          className="todo-input"
        />
        <div className="todo-date-time">
          <Input
            value={newDueDate}
            onChange={(e) => setNewDueDate(e.target.value)}
            type="date"
            className="todo-input"
          />
          <Input
            value={newDueTime}
            onChange={(e) => setNewDueTime(e.target.value)}
            type="time"
            className="todo-input"
          />
        </div>
        <Select
          value={newCategory}
          onChange={setNewCategory}
          options={categories}
          placeholder="Select a category"
          className="todo-input"
        />
        <Button type="submit" className="todo-input">
          {editingTask ? 'Update' : 'Add'}
        </Button>
        {editingTask && (
          <Button variant="outline" onClick={cancelEditing} className="todo-input">
            Cancel
          </Button>
        )}
      </form>
      
      <div className="todo-summary">
        Tasks ✓ : {completedTasks}/{totalTasks}
      </div>  

      <div className="todo-list">
        {tasks.map(task => (
          <div
            key={task.id}
            className={`todo-item ${task.completed ? 'completed' : ''}`}
          >
            <div className="todo-item-content">
              <Button
                variant="icon"
                onClick={() => toggleComplete(task.id)}
                className={task.completed ? 'complete-button completed' : 'complete-button'}
              >
                ✓
              </Button>
              <div className="todo-item-text">
                <p className="todo-item-title">{task.title}</p>
                <p className="todo-item-description">{task.description}</p>
                <p className="todo-item-date-time">{task.dueDate} at {task.dueTime}</p>
                <span className="todo-item-category">{task.category}</span>
              </div>
            </div>
            <div className="todo-item-actions">
              <Button
                variant="icon"
                onClick={() => startEditing(task)}
                disabled={task.completed}
              >
                ✎
              </Button>
              <Button
                variant="icon"
                onClick={() => deleteTask(task.id)}
                className="delete-button"
              >
                ×
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TodoList;
