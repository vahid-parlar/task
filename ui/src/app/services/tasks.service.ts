import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MemberInput } from '@models/member-input';
import { Project } from '@models/project';
import { ProjectResult } from '@models/project-result';
import { Task } from '@models/task';
import { TaskAssignmentInput } from '@models/task-assignment-input';
import { Utility } from 'app/shared/utility';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {}

  addTask(task: Task) {
    return this.http.post<number>(`${Utility.serverUrl}/tasks`, task);
  }
  // getTasks() {
  //   return this.http.get<ProjectResult[]>(`${Utility.serverUrl}/tasks`);
  // }

  assignTaskToMember(assignment: TaskAssignmentInput) {
    return this.http.post<any>(`${Utility.serverUrl}/tasks/assign-to-member`, assignment);
  }
}

