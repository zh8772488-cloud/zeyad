import { Member, Task, TaskStatus, Priority, ProjectStats } from './types';

export const MOCK_MEMBERS: Member[] = [
  { id: '1', name: 'Sarah Ahmed', role: 'Senior Editor', avatar: 'https://picsum.photos/100/100?random=1', tasksCompleted: 45, onTimeRate: 98 },
  { id: '2', name: 'Omar Khalid', role: 'Illustrator', avatar: 'https://picsum.photos/100/100?random=2', tasksCompleted: 32, onTimeRate: 85 },
  { id: '3', name: 'Layla M.', role: 'Content Writer', avatar: 'https://picsum.photos/100/100?random=3', tasksCompleted: 28, onTimeRate: 92 },
];

export const MOCK_TASKS: Task[] = [
  { id: '101', title: 'Chapter 1 Grammar Review', section: 'Grammar', status: TaskStatus.IN_PROGRESS, priority: Priority.HIGH, dueDate: '2023-10-25', assignee: MOCK_MEMBERS[0], description: 'Review the past tense exercises and ensure alignment with the curriculum standards.' },
  { id: '102', title: 'Character Sketches for Unit 3', section: 'Design', status: TaskStatus.TODO, priority: Priority.MEDIUM, dueDate: '2023-10-28', assignee: MOCK_MEMBERS[1], description: 'Create initial sketches for the main protagonist in the marketplace scene.' },
  { id: '103', title: 'Vocabulary List Compilation', section: 'Vocabulary', status: TaskStatus.DONE, priority: Priority.LOW, dueDate: '2023-10-20', assignee: MOCK_MEMBERS[2], description: 'Compile the glossary for Unit 1 and 2.' },
  { id: '104', title: 'Final Proofread Storybook', section: 'Storybook', status: TaskStatus.REVIEW, priority: Priority.HIGH, dueDate: '2023-10-26', assignee: MOCK_MEMBERS[0], description: 'Final check for typos and flow in the supplementary storybook.' },
  { id: '105', title: 'Skills Assessment Draft', section: 'Skills', status: TaskStatus.TODO, priority: Priority.MEDIUM, dueDate: '2023-11-01', assignee: MOCK_MEMBERS[2], description: 'Draft the questions for the listening skills assessment.' },
];

export const MOCK_STATS: ProjectStats = {
  grammar: 75,
  vocabulary: 90,
  skills: 40,
  storybook: 60,
  design: 25
};
