import React, { useState } from 'react';
import { Card, Badge, Button } from '../components/UI';
import { MOCK_STATS, MOCK_TASKS } from '../constants';
import { Bell, Sparkles } from 'lucide-react';
import { generateProjectSummary } from '../services/geminiService';

const COLORS = ['#2458FF', '#C8A44D', '#0A1A2F', '#8A8D93', '#10B981'];

const Dashboard: React.FC = () => {
  const [summary, setSummary] = useState<string | null>(null);
  const [loadingSummary, setLoadingSummary] = useState(false);

  const handleGenerateSummary = async () => {
    setLoadingSummary(true);
    const result = await generateProjectSummary(MOCK_TASKS);
    setSummary(result);
    setLoadingSummary(false);
  };

  const chartData = [
    { name: 'Grammar', value: MOCK_STATS.grammar },
    { name: 'Vocabulary', value: MOCK_STATS.vocabulary },
    { name: 'Skills', value: MOCK_STATS.skills },
    { name: 'Storybook', value: MOCK_STATS.storybook },
    { name: 'Design', value: MOCK_STATS.design },
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 pb-24">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary">Overview</h1>
          <p className="text-neutral text-sm">Welcome back, Lead Editor.</p>
        </div>
        <button className="p-2 bg-white rounded-full shadow-sm border border-gray-100 relative">
          <Bell className="w-6 h-6 text-primary" />
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="flex flex-col justify-between border-l-4 border-l-secondary">
          <div className="text-neutral text-xs uppercase font-bold tracking-wider">Pending</div>
          <div className="text-2xl font-bold text-primary mt-2">12</div>
        </Card>
        <Card className="flex flex-col justify-between border-l-4 border-l-accent">
          <div className="text-neutral text-xs uppercase font-bold tracking-wider">In Progress</div>
          <div className="text-2xl font-bold text-primary mt-2">5</div>
        </Card>
        <Card className="flex flex-col justify-between border-l-4 border-l-green-500">
          <div className="text-neutral text-xs uppercase font-bold tracking-wider">Completed</div>
          <div className="text-2xl font-bold text-primary mt-2">28</div>
        </Card>
        <Card className="flex flex-col justify-between border-l-4 border-l-red-500">
          <div className="text-neutral text-xs uppercase font-bold tracking-wider">Delayed</div>
          <div className="text-2xl font-bold text-primary mt-2">2</div>
        </Card>
      </div>

      {/* AI Summary Section */}
      <Card className="bg-gradient-to-br from-primary to-[#1a2d47] text-white border-none">
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
             <div className="p-2 bg-white/10 rounded-lg">
                <Sparkles className="w-5 h-5 text-accent" />
             </div>
             <div>
                <h3 className="font-semibold text-lg">AI Project Insights</h3>
                <p className="text-gray-400 text-sm mt-1">Get a quick summary of your team's velocity.</p>
             </div>
          </div>
          <Button 
            size="sm" 
            variant="ghost" 
            className="text-accent hover:text-white hover:bg-white/10"
            onClick={handleGenerateSummary}
            disabled={loadingSummary}
          >
            {loadingSummary ? 'Thinking...' : 'Analyze'}
          </Button>
        </div>
        {summary && (
            <div className="mt-4 p-3 bg-white/5 rounded-xl text-sm leading-relaxed border border-white/10">
                {summary}
            </div>
        )}
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Progress Chart */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-primary">Unit Progress</h2>
          <div className="space-y-5">
            {chartData.map((item, index) => (
                <div key={item.name}>
                    <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-primary">{item.name}</span>
                        <span className="text-neutral">{item.value}%</span>
                    </div>
                    <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div 
                            className="h-full rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${item.value}%`, backgroundColor: COLORS[index % COLORS.length] }}
                        ></div>
                    </div>
                </div>
            ))}
          </div>
        </div>

        {/* Notifications / Recent Activity */}
        <div className="space-y-6">
           <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-primary">Needs Attention</h2>
              <Button size="sm" variant="ghost" className="text-xs">View All</Button>
           </div>
           
           <div className="space-y-3">
              {MOCK_TASKS.filter(t => t.priority === 'High' || t.status === 'Review').slice(0, 3).map(task => (
                  <Card key={task.id} className="p-3 flex gap-3 items-center hover:shadow-md transition-shadow cursor-pointer">
                      <div className={`w-2 h-12 rounded-full ${task.priority === 'High' ? 'bg-red-500' : 'bg-secondary'}`}></div>
                      <div className="flex-1">
                          <h4 className="font-semibold text-sm text-primary line-clamp-1">{task.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                             <img src={task.assignee?.avatar} className="w-5 h-5 rounded-full" alt="avatar" />
                             <span className="text-xs text-neutral">{task.assignee?.name}</span>
                          </div>
                      </div>
                      <Badge color={task.status === 'Review' ? 'yellow' : 'red'}>{task.status}</Badge>
                  </Card>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;