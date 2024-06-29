import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '@models/task';
import { TaskAssignmentInput } from '@models/task-assignment-input';
import { TaskInput } from '@models/task-input';
import { TaskResult } from '@models/task-result';
import { TaskStatusInput } from '@models/task-status-input';
import { Utility } from 'app/shared/utility';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  addTask(task: Task) {
    return this.http.post<number>(`${Utility.serverUrl}/tasks`, task);
  }
  getTasks(taskInput: TaskInput) {
    return this.http.get<TaskResult[]>(`${Utility.serverUrl}/tasks`);
  }
  changeTaskStatus(taskStatusInput: TaskStatusInput) {
    return this.http.put<any>(
      `${Utility.serverUrl}/tasks/status`,
      taskStatusInput
    );
  }
  assignTaskToMember(assignment: TaskAssignmentInput) {
    return this.http.post<any>(
      `${Utility.serverUrl}/tasks/assign-to-member`,
      assignment
    );
  }
}
