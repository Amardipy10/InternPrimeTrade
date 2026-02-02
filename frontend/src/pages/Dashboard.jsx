import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import ProfileCard from '../components/profile/ProfileCard';
import TaskList from '../components/tasks/TaskList';
import { useAuth } from '../context/AuthContext';
import { 
  ClipboardDocumentListIcon, 
  UserCircleIcon,
  HomeIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('overview');
  const { user } = useAuth();

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['overview', 'tasks', 'profile'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: HomeIcon },
    { id: 'tasks', name: 'Tasks', icon: ClipboardDocumentListIcon },
    { id: 'profile', name: 'Profile', icon: UserCircleIcon },
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <DashboardLayout>
      {/* Welcome Banner */}
      {activeTab === 'overview' && (
        <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <SparklesIcon className="h-6 w-6 text-indigo-400" />
            <span className="text-indigo-300 text-sm font-medium">Dashboard</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {getGreeting()}, {user?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-gray-400">
            Welcome to your dashboard. Manage your tasks and profile from here.
          </p>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 p-1.5 bg-gray-800/50 rounded-xl border border-gray-700 inline-flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200
                ${activeTab === tab.id
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }
              `}
            >
              <tab.icon className="h-5 w-5" />
              <span className="hidden sm:inline">{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="animate-fade-in">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div 
                onClick={() => handleTabChange('tasks')}
                className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 cursor-pointer hover:border-blue-400 transition-all card-hover"
              >
                <ClipboardDocumentListIcon className="h-8 w-8 text-blue-400 mb-3" />
                <h3 className="text-xl font-semibold text-white mb-1">Tasks</h3>
                <p className="text-gray-400 text-sm">Manage your tasks and to-dos</p>
              </div>
              
              <div 
                onClick={() => handleTabChange('profile')}
                className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 cursor-pointer hover:border-purple-400 transition-all card-hover"
              >
                <UserCircleIcon className="h-8 w-8 text-purple-400 mb-3" />
                <h3 className="text-xl font-semibold text-white mb-1">Profile</h3>
                <p className="text-gray-400 text-sm">View and edit your profile</p>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30">
                <SparklesIcon className="h-8 w-8 text-emerald-400 mb-3" />
                <h3 className="text-xl font-semibold text-white mb-1">Getting Started</h3>
                <p className="text-gray-400 text-sm">Create your first task to begin</p>
              </div>
            </div>

            {/* Recent Tasks Preview */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-white mb-4">Quick Access</h2>
              <TaskList />
            </div>
          </div>
        )}

        {activeTab === 'tasks' && <TaskList />}
        
        {activeTab === 'profile' && <ProfileCard />}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
