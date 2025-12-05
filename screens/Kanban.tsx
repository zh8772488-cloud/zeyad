import React, { useState } from 'react';
import { MOCK_TASKS } from '../constants';
import { TaskStatus, Priority, Task } from '../types';
import { Card, Badge, Button } from '../components/UI';
import { Calendar, Plus, MoreHorizontal, Filter } from 'lucide-react';

const Kanban: React.FC<{ onTaskClick: (task: Task) => void }> = ({ onTaskClick }) => {
  const [filter, setFilter] = useState('');
  
  const columns = [
    { id: TaskStatus.TODO, title: 'To Do', color: 'bg-gray-200' },
    { id: TaskStatus.IN_PROGRESS, title: 'In Progress', color: 'bg-secondary' },
    { id: TaskStatus.REVIEW, title: 'Review', color: 'bg-accent' },
    { id: TaskStatus.DONE, title: 'Done', color: 'bg-green-500' },
  ];

  const getPriorityColor = (p: Priority) => {
    switch (p) {
        case Priority.HIGH: return 'red';
        case Priority.MEDIUM: return 'yellow';
        default: return 'blue';
    }
  };

  return (
    <div className="h-full flex flex-col p-4 md:p-6 pb-24 overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary">Task Board</h1>
        <div className="flex gap-2">
            <Button variant="outline" size="sm" className="hidden md:flex"><Filter className="w-4 h-4 mr-2"/> Filter</Button>
            <Button size="sm"><Plus className="w-4 h-4 mr-2"/> Add Task</Button>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto h-full pb-4 items-start snap-x">
        {columns.map(col => (
            <div key={col.id} className="min-w-[280px] w-[320px] flex-shrink-0 flex flex-col h-full snap-center">
                <div className="flex items-center justify-between mb-3 px-1">
                    <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${col.color}`}></div>
                        <h3 className="font-semibold text-primary">{col.title}</h3>
                        <span className="text-xs text-neutral bg-white px-2 py-0.5 rounded-full border border-gray-100">
                            {MOCK_TASKS.filter(t => t.status === col.id).length}
                        </span>
                    </div>
                    <button className="text-neutral hover:text-primary"><MoreHorizontal className="w-5 h-5"/></button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-3 p-1">
                    {MOCK_TASKS.filter(t => t.status === col.id).map(task => (
                        <Card 
                            key={task.id} 
                            className="cursor-pointer hover:shadow-md transition-all active:scale-95 group"
                            onClick={() => onTaskClick(task)}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <Badge color={getPriorityColor(task.priority)}>{task.priority}</Badge>
                                <button className="opacity-0 group-hover:opacity-100 text-neutral transition-opacity">
                                    <MoreHorizontal className="w-4 h-4"/>
                                </button>
                            </div>
                            <h4 className="font-semibold text-primary mb-1">{task.title}</h4>
                            <p className="text-xs text-neutral mb-3">{task.section}</p>
                            
                            <div className="flex justify-between items-center pt-3 border-t border-gray-50">
                                <div className="flex -space-x-2">
                                    <img src={task.assignee?.avatar} alt={task.assignee?.name} className="w-6 h-6 rounded-full border-2 border-white" />
                                </div>
                                <div className="flex items-center text-xs text-neutral font-medium">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    {new Date(task.dueDate).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}
                                </div>
                            </div>
                        </Card>
                    ))}
                    
                    <button className="w-full py-2 border-2 border-dashed border-gray-200 rounded-xl text-neutral text-sm font-medium hover:border-secondary hover:text-secondary transition-colors">
                        + New Task
                    </button>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Kanban;