import React from 'react';
import { MOCK_MEMBERS, MOCK_TASKS } from '../constants';
import { Card, Badge, Button } from '../components/UI';
import { Mail, Phone, Award, CheckCircle2 } from 'lucide-react';

const Profile: React.FC = () => {
  // Mocking the logged-in user or a selected profile
  const member = MOCK_MEMBERS[0];
  const assignedTasks = MOCK_TASKS.filter(t => t.assignee?.id === member.id);

  return (
    <div className="p-4 md:p-8 pb-24 space-y-6">
      <Card className="relative overflow-hidden border-0">
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-primary to-secondary"></div>
          <div className="relative pt-12 px-4 pb-4 flex flex-col md:flex-row items-center md:items-end gap-4">
              <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                  <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <div className="text-center md:text-left flex-1">
                  <h1 className="text-2xl font-bold text-primary">{member.name}</h1>
                  <p className="text-neutral">{member.role}</p>
              </div>
              <div className="flex gap-2 mt-4 md:mt-0">
                  <Button variant="outline" size="sm"><Mail className="w-4 h-4"/></Button>
                  <Button variant="primary" size="sm">Edit Profile</Button>
              </div>
          </div>
      </Card>

      <div className="grid grid-cols-2 gap-4">
          <Card className="flex items-center gap-4">
              <div className="p-3 bg-green-50 rounded-full text-green-600">
                  <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                  <div className="text-2xl font-bold text-primary">{member.tasksCompleted}</div>
                  <div className="text-xs text-neutral">Tasks Done</div>
              </div>
          </Card>
          <Card className="flex items-center gap-4">
              <div className="p-3 bg-yellow-50 rounded-full text-yellow-600">
                  <Award className="w-6 h-6" />
              </div>
              <div>
                  <div className="text-2xl font-bold text-primary">{member.onTimeRate}%</div>
                  <div className="text-xs text-neutral">On-Time Rate</div>
              </div>
          </Card>
      </div>

      <div>
          <h2 className="text-xl font-bold text-primary mb-4">Assigned Tasks</h2>
          <div className="space-y-3">
              {assignedTasks.map(task => (
                  <Card key={task.id} className="flex justify-between items-center p-4 hover:bg-gray-50 transition-colors">
                      <div>
                          <h4 className="font-semibold text-primary">{task.title}</h4>
                          <span className="text-xs text-neutral">Due: {task.dueDate}</span>
                      </div>
                      <Badge color={task.status === 'Done' ? 'green' : 'blue'}>{task.status}</Badge>
                  </Card>
              ))}
          </div>
      </div>
    </div>
  );
};

export default Profile;
