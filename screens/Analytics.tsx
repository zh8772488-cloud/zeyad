import React from 'react';
import { Card } from '../components/UI';
import { MOCK_MEMBERS, MOCK_STATS } from '../constants';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, 
  LineChart, Line, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis 
} from 'recharts';

const Analytics: React.FC = () => {
  const memberPerformanceData = MOCK_MEMBERS.map(m => ({
    name: m.name.split(' ')[0], // First name
    completed: m.tasksCompleted,
    rate: m.onTimeRate
  }));

  const weeklyProgressData = [
    { name: 'Week 1', tasks: 12 },
    { name: 'Week 2', tasks: 19 },
    { name: 'Week 3', tasks: 15 },
    { name: 'Week 4', tasks: 28 },
  ];

  const unitProgressData = [
    { subject: 'Grammar', A: MOCK_STATS.grammar, fullMark: 100 },
    { subject: 'Vocab', A: MOCK_STATS.vocabulary, fullMark: 100 },
    { subject: 'Skills', A: MOCK_STATS.skills, fullMark: 100 },
    { subject: 'Story', A: MOCK_STATS.storybook, fullMark: 100 },
    { subject: 'Design', A: MOCK_STATS.design, fullMark: 100 },
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 pb-24">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary">Analytics</h1>
          <p className="text-neutral text-sm">Performance insights and bottlenecks.</p>
        </div>
        <select className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-primary outline-none focus:ring-2 focus:ring-secondary">
            <option>Last 30 Days</option>
            <option>This Quarter</option>
            <option>All Time</option>
        </select>
      </div>

      {/* Key Metrics - Moved to Top */}
      <Card className="bg-primary text-white border-none shadow-xl shadow-primary/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-white/10">
              <div className="p-4 text-center">
                  <div className="text-4xl font-bold text-accent mb-1">94%</div>
                  <div className="text-sm text-gray-300">On-Time Delivery Rate</div>
              </div>
              <div className="p-4 text-center">
                  <div className="text-4xl font-bold text-secondary mb-1">128</div>
                  <div className="text-sm text-gray-300">Total Tasks Completed</div>
              </div>
              <div className="p-4 text-center">
                  <div className="text-4xl font-bold text-white mb-1">14</div>
                  <div className="text-sm text-gray-300">Days Until Launch</div>
              </div>
          </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Velocity - Full Width on Large Screens */}
        <Card className="lg:col-span-2">
            <h3 className="text-lg font-bold text-primary mb-6">Weekly Velocity</h3>
            <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weeklyProgressData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#8A8D93', fontSize: 12}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#8A8D93', fontSize: 12}} />
                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                        <Line type="monotone" dataKey="tasks" stroke="#2458FF" strokeWidth={3} dot={{r: 4, fill: '#2458FF', strokeWidth: 2, stroke: '#fff'}} activeDot={{ r: 6 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </Card>

        {/* Team Output */}
        <Card>
            <h3 className="text-lg font-bold text-primary mb-6">Team Output</h3>
            <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={memberPerformanceData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#8A8D93', fontSize: 12}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#8A8D93', fontSize: 12}} />
                        <Tooltip cursor={{fill: '#F3F4F6'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                        <Bar dataKey="completed" fill="#0A1A2F" radius={[4, 4, 0, 0]} barSize={40} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>

        {/* Unit Progress (Radar Chart) */}
        <Card>
            <h3 className="text-lg font-bold text-primary mb-6">Unit Progress</h3>
            <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={unitProgressData}>
                        <PolarGrid stroke="#E5E7EB" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#0A1A2F', fontSize: 12, fontWeight: 600 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar
                            name="Progress"
                            dataKey="A"
                            stroke="#C8A44D"
                            strokeWidth={2}
                            fill="#C8A44D"
                            fillOpacity={0.4}
                        />
                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;