import { useState, useCallback } from 'react';
import { tasksAPI } from '../services/api';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await tasksAPI.getTasks(params);
      setTasks(response.data.data.tasks);
      return response.data.data.tasks;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = useCallback(async (taskData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await tasksAPI.createTask(taskData);
      const newTask = response.data.data.task;
      setTasks(prev => [newTask, ...prev]);
      return newTask;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create task');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTask = useCallback(async (id, taskData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await tasksAPI.updateTask(id, taskData);
      const updatedTask = response.data.data.task;
      setTasks(prev => prev.map(t => t._id === id ? updatedTask : t));
      return updatedTask;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update task');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteTask = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await tasksAPI.deleteTask(id);
      setTasks(prev => prev.filter(t => t._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete task');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask
  };
};
