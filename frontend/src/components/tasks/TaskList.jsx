import { useState, useEffect, useCallback } from 'react';
import { useTasks } from '../../hooks/useTasks';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import TaskFilters from './TaskFilters';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Loading from '../common/Loading';
import { PlusIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const TaskList = () => {
  const { tasks, loading, fetchTasks, createTask, updateTask, deleteTask } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    priority: ''
  });
  const [isDeleting, setIsDeleting] = useState(false);

  const loadTasks = useCallback(async () => {
    const params = {};
    if (filters.search) params.search = filters.search;
    if (filters.status) params.status = filters.status;
    if (filters.priority) params.priority = filters.priority;

    try {
      await fetchTasks(params);
    } catch (error) {
      toast.error('Failed to load tasks');
    }
  }, [fetchTasks, filters]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      loadTasks();
    }, 300);

    return () => clearTimeout(debounce);
  }, [loadTasks]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({ search: '', status: '', priority: '' });
  };

  const handleCreateTask = async (taskData) => {
    try {
      await createTask(taskData);
      setIsModalOpen(false);
      toast.success('Task created successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create task');
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      await updateTask(editingTask._id, taskData);
      setIsModalOpen(false);
      setEditingTask(null);
      toast.success('Task updated successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    setIsDeleting(true);
    try {
      await deleteTask(taskId);
      toast.success('Task deleted successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete task');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await updateTask(taskId, { status: newStatus });
      toast.success(`Task marked as ${newStatus === 'completed' ? 'completed' : 'in progress'}!`);
    } catch (error) {
      toast.error('Failed to update task status');
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  // Stats
  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Tasks</h2>
          <p className="text-gray-400 text-sm mt-1">
            Manage and track your tasks efficiently
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
          <PlusIcon className="h-5 w-5" />
          Add Task
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-gray-800/50 border border-gray-700">
          <p className="text-3xl font-bold text-white">{stats.total}</p>
          <p className="text-sm text-gray-400">Total Tasks</p>
        </div>
        <div className="p-4 rounded-xl bg-gray-800/50 border border-gray-700">
          <p className="text-3xl font-bold text-gray-400">{stats.pending}</p>
          <p className="text-sm text-gray-400">Pending</p>
        </div>
        <div className="p-4 rounded-xl bg-gray-800/50 border border-gray-700">
          <p className="text-3xl font-bold text-blue-400">{stats.inProgress}</p>
          <p className="text-sm text-gray-400">In Progress</p>
        </div>
        <div className="p-4 rounded-xl bg-gray-800/50 border border-gray-700">
          <p className="text-3xl font-bold text-green-400">{stats.completed}</p>
          <p className="text-sm text-gray-400">Completed</p>
        </div>
      </div>

      {/* Filters */}
      <TaskFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      {/* Task Grid */}
      {loading && !tasks.length ? (
        <div className="flex justify-center py-12">
          <Loading size="lg" />
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-16">
          <ClipboardDocumentListIcon className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-400 mb-2">No tasks found</h3>
          <p className="text-gray-500 mb-6">
            {filters.search || filters.status || filters.priority
              ? 'Try adjusting your filters'
              : 'Create your first task to get started'}
          </p>
          {!filters.search && !filters.status && !filters.priority && (
            <Button onClick={() => setIsModalOpen(true)}>
              <PlusIcon className="h-5 w-5 mr-2" />
              Create Task
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={handleEdit}
              onDelete={handleDeleteTask}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}

      {/* Task Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingTask ? 'Edit Task' : 'Create New Task'}
      >
        <TaskForm
          task={editingTask}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          onCancel={handleCloseModal}
          loading={loading}
        />
      </Modal>
    </div>
  );
};

export default TaskList;
