export enum TaskStatus {
  TODO = 'To Do',
  IN_PROGRESS = 'In Progress',
  REVIEW = 'Review',
  DONE = 'Done'
}

export enum Priority {
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low'
}

export interface Member {
  id: string;
  name: string;
  role: string;
  avatar: string;
  tasksCompleted: number;
  onTimeRate: number; // percentage
}

export interface Task {
  id: string;
  title: string;
  section: string; // e.g., Grammar, Vocabulary
  status: TaskStatus;
  priority: Priority;
  dueDate: string;
  assignee?: Member;
  description?: string;
}

export interface ProjectStats {
  grammar: number;
  vocabulary: number;
  skills: number;
  storybook: number;
  design: number;
}
