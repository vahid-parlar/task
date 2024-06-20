import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '@models/project';
import { Utility } from 'app/shared/utility';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) {}

  addProject(project: Project) {
    return this.http.post<Project>(`${Utility.serverUrl}/projects`, project);
  }
  getProjects() {
    return this.http.get<Project[]>(`${Utility.serverUrl}/projects`);
  }
  deleteProject(id: string) {
    return this.http.delete<Project>(`${Utility.serverUrl}/projects/${id}`);
  }
  // getProject(id: string) {
  //   return this.http.get<Project>(`${Utility.serverUrl}/projects/${id}`);
  // }
}

