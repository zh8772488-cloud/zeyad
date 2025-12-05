import React, { useState } from 'react';
import { Task } from '../types';
import { Button, Badge } from '../components/UI';
import { X, Calendar, Paperclip, MessageSquare, CheckCircle, RotateCcw, Sparkles } from 'lucide-react';
import { refineTaskDescription } from '../services/geminiService';

interface TaskDetailsProps {
  task: Task;
  onClose: () => void;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ task, onClose }) => {
  const [description, setDescription] = useState(task.description || '');
  const [isRefining, setIsRefining] = useState(false);

  const handleRefine = async () => {
    setIsRefining(true);
    const refined = await refineTaskDescription(task.title, description);
    setDescription(refined);
    setIsRefining(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40 backdrop-blur-sm p-0 md:p-4">
      <div className="bg-bgLight w-full max-w-2xl h-[90vh] md:h-auto md:max-h-[85vh] rounded-t-3xl md:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-up">
        
        {/* Header */}
        <div className="bg-white p-6 border-b border-gray-100 flex justify-between items-start sticky top-0 z-10">
          <div>
             <div className="flex gap-2 mb-2">
                <Badge color="blue">{task.section}</Badge>
                <Badge color={task.priority === 'High' ? 'red' : 'green'}>{task.priority}</Badge>
             </div>
             <h2 className="text-2xl font-bold text-primary leading-tight">{task.title}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-6 h-6 text-neutral" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
            
            {/* Meta Data */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-xl border border-gray-100 flex items-center gap-3">
                    <img src={task.assignee?.avatar} className="w-10 h-10 rounded-full" alt="" />
                    <div>
                        <div className="text-xs text-neutral">Assignee</div>
                        <div className="font-semibold text-primary text-sm">{task.assignee?.name}</div>
                    </div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-gray-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                        <Calendar className="w-5 h-5"/>
                    </div>
                    <div>
                        <div className="text-xs text-neutral">Due Date</div>
                        <div className="font-semibold text-primary text-sm">{task.dueDate}</div>
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-primary">Description</h3>
                    <button 
                        onClick={handleRefine}
                        disabled={isRefining}
                        className="text-accent text-xs flex items-center hover:underline disabled:opacity-50"
                    >
                        <Sparkles className="w-3 h-3 mr-1" />
                        {isRefining ? 'Improving...' : 'Improve with AI'}
                    </button>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100 text-sm leading-relaxed text-gray-600">
                    {description}
                </div>
            </div>

            {/* Attachments Placeholder */}
            <div className="space-y-3">
                <h3 className="font-bold text-primary flex items-center gap-2">
                    <Paperclip className="w-4 h-4" /> Attachments
                </h3>
                <div className="grid grid-cols-2 gap-3">
                    <div className="h-24 bg-gray-100 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-neutral text-xs cursor-pointer hover:bg-gray-50 hover:border-secondary transition-colors">
                        <span className="text-2xl mb-1">+</span>
                        Upload File
                    </div>
                    {/* Mock Attachment */}
                    <div className="h-24 bg-white rounded-xl border border-gray-200 p-3 flex flex-col justify-between relative overflow-hidden group">
                         <div className="absolute inset-0 bg-primary/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-medium cursor-pointer">View</div>
                         <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center text-red-600 font-bold text-xs">PDF</div>
                         <div className="text-xs font-medium truncate">Draft_v1.pdf</div>
                    </div>
                </div>
            </div>
            
            {/* Comments Placeholder */}
             <div className="space-y-3">
                <h3 className="font-bold text-primary flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" /> Comments
                </h3>
                <div className="flex gap-3">
                    <img src="https://picsum.photos/100/100?random=99" className="w-8 h-8 rounded-full" alt="You" />
                    <input 
                        type="text" 
                        placeholder="Write a comment..." 
                        className="flex-1 bg-white border border-gray-200 rounded-full px-4 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                </div>
             </div>

        </div>

        {/* Footer Actions */}
        <div className="bg-white p-4 border-t border-gray-100 flex gap-3 pb-8 md:pb-4">
             <Button variant="outline" className="flex-1 border-red-200 text-red-600 hover:bg-red-50">
                <RotateCcw className="w-4 h-4 mr-2" /> Request Revision
             </Button>
             <Button className="flex-1">
                <CheckCircle className="w-4 h-4 mr-2" /> Approve
             </Button>
        </div>

      </div>
    </div>
  );
};

export default TaskDetails;