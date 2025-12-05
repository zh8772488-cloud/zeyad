import React, { useState } from 'react';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import Kanban from './screens/Kanban';
import Profile from './screens/Profile';
import Analytics from './screens/Analytics';
import Layout from './components/Layout';
import TaskDetails from './screens/TaskDetails';
import { Task } from './types';

function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleLogin = () => {
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setCurrentScreen('login');
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
  };

  const handleCloseTask = () => {
    setSelectedTask(null);
  };

  if (currentScreen === 'login') {
    return <Login onLogin={handleLogin} />;
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <Dashboard />;
      case 'kanban':
        return <Kanban onTaskClick={handleTaskClick} />;
      case 'profile':
        return <Profile />;
      case 'analytics':
        return <Analytics />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <Layout 
        activeScreen={currentScreen} 
        onNavigate={setCurrentScreen}
        onLogout={handleLogout}
      >
        {renderScreen()}
      </Layout>
      
      {selectedTask && (
        <TaskDetails task={selectedTask} onClose={handleCloseTask} />
      )}
    </>
  );
}

export default App;
