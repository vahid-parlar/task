import { Moment } from 'jalali-moment';
import { TaskStatus } from './task-result';

export class TaskInput {
  taskId?: number;
  projectId?: number;
  priority?: number;
  deadLine?: Moment;
  TaskStatus?: TaskStatus;
  SortType: TaskSortType;

  constructor() {
    this.SortType = TaskSortType.Priority
  }
}

enum TaskSortType {
  Priority = 1,
  Deadline = 2,
}
