import Navbar from './Navbar';

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-indigo-950 pointer-events-none" />
      <div className="fixed top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-purple-900/20 to-transparent pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-indigo-900/20 to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
