import { useState, useEffect } from 'react';
import { validateTaskForm } from '../../utils/validation';
import Input from '../common/Input';
import Button from '../common/Button';

const TaskForm = ({ task, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    dueDate: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        status: task.status || 'pending',
        priority: task.priority || 'medium',
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateTaskForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const submitData = {
      ...formData,
      dueDate: formData.dueDate || null
    };

    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Title"
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Enter task title"
        error={errors.title}
        required
      />

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-300">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter task description (optional)"
          rows={3}
          maxLength={500}
          className={`
            block w-full rounded-xl border-0 bg-gray-800/50 text-white placeholder-gray-500
            focus:ring-2 focus:ring-indigo-500 transition-all duration-200
            px-4 py-3 ring-1 ring-gray-700 hover:ring-gray-600 resize-none
            ${errors.description ? 'ring-2 ring-red-500' : ''}
          `}
        />
        <p className="text-xs text-gray-500 text-right">
          {formData.description.length}/500 characters
        </p>
        {errors.description && (
          <p className="text-sm text-red-400">{errors.description}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-300">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="block w-full rounded-xl border-0 bg-gray-800/50 text-white
              focus:ring-2 focus:ring-indigo-500 transition-all duration-200
              px-4 py-3 ring-1 ring-gray-700 hover:ring-gray-600"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-300">Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="block w-full rounded-xl border-0 bg-gray-800/50 text-white
              focus:ring-2 focus:ring-indigo-500 transition-all duration-200
              px-4 py-3 ring-1 ring-gray-700 hover:ring-gray-600"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-300">Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className="block w-full rounded-xl border-0 bg-gray-800/50 text-white
            focus:ring-2 focus:ring-indigo-500 transition-all duration-200
            px-4 py-3 ring-1 ring-gray-700 hover:ring-gray-600"
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          loading={loading}
        >
          {task ? 'Update Task' : 'Create Task'}
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
