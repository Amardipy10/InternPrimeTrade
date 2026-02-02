import Card from '../common/Card';
import Button from '../common/Button';
import { 
  PencilIcon, 
  TrashIcon,
  CalendarIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const priorityColors = {
    low: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    medium: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    high: 'bg-red-500/20 text-red-400 border-red-500/30'
  };

  const statusColors = {
    'pending': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    'in-progress': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'completed': 'bg-green-500/20 text-green-400 border-green-500/30'
  };

  const statusLabels = {
    'pending': 'Pending',
    'in-progress': 'In Progress',
    'completed': 'Completed'
  };

  const formatDate = (date) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed';

  return (
    <Card hover className="group relative overflow-hidden">
      {/* Status indicator line */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${
        task.status === 'completed' ? 'bg-green-500' :
        task.status === 'in-progress' ? 'bg-blue-500' :
        'bg-gray-500'
      }`} />

      <div className="pt-2">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <h3 className={`font-semibold text-lg ${
            task.status === 'completed' ? 'text-gray-400 line-through' : 'text-white'
          }`}>
            {task.title}
          </h3>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(task)}
              className="p-2 text-gray-400 hover:text-indigo-400 hover:bg-indigo-500/20 rounded-lg transition-all"
            >
              <PencilIcon className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(task._id)}
              className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-all"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Description */}
        {task.description && (
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {task.description}
          </p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[task.status]}`}>
            {statusLabels[task.status]}
          </span>
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${priorityColors[task.priority]}`}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
          </span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-700/50">
          <div className="flex items-center gap-4 text-xs text-gray-500">
            {task.dueDate && (
              <span className={`flex items-center gap-1 ${isOverdue ? 'text-red-400' : ''}`}>
                <CalendarIcon className="h-4 w-4" />
                {formatDate(task.dueDate)}
                {isOverdue && ' (Overdue)'}
              </span>
            )}
            <span className="flex items-center gap-1">
              <ClockIcon className="h-4 w-4" />
              {formatDate(task.createdAt)}
            </span>
          </div>

          {/* Quick status change */}
          {task.status !== 'completed' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onStatusChange(task._id, task.status === 'pending' ? 'in-progress' : 'completed')}
              className="text-xs"
            >
              {task.status === 'pending' ? 'Start' : 'Complete'}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
