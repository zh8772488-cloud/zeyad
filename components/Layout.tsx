import React from 'react';
import { LayoutDashboard, KanbanSquare, PieChart, User, LogOut } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeScreen: string;
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeScreen, onNavigate, onLogout }) => {
  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Overview' },
    { id: 'kanban', icon: KanbanSquare, label: 'Tasks' },
    { id: 'analytics', icon: PieChart, label: 'Analytics' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-bgLight flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-primary text-white h-screen sticky top-0">
        <div className="p-6">
           <h1 className="text-2xl font-bold tracking-tight text-white">Muttabae</h1>
           <span className="text-xs text-gray-400 tracking-widest uppercase">Book Production</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center w-full px-4 py-3 rounded-xl transition-all ${
                activeScreen === item.id 
                ? 'bg-secondary text-white shadow-lg shadow-blue-900/50' 
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4">
            <button onClick={onLogout} className="flex items-center w-full px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-xl transition-colors">
                <LogOut className="w-5 h-5 mr-3" />
                <span>Sign Out</span>
            </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-screen overflow-y-auto w-full relative">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 px-6 py-2 flex justify-between items-center z-40 safe-area-bottom shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        {navItems.map(item => (
           <button
             key={item.id}
             onClick={() => onNavigate(item.id)}
             className={`flex flex-col items-center justify-center p-2 rounded-xl transition-colors ${
               activeScreen === item.id ? 'text-secondary' : 'text-neutral'
             }`}
           >
             <item.icon className={`w-6 h-6 mb-1 ${activeScreen === item.id ? 'fill-current' : ''}`} />
             <span className="text-[10px] font-medium">{item.label}</span>
           </button>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
