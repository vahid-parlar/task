import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Project } from '@models/project';
import { MaterialModule } from '@modules/Material.module';
import { ProjectService } from '@services/projects.service';
import { map, take } from 'rxjs';

@Component({
  selector: 'project-list',
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ProjectListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public projectDate!: Project[];
  public dataSource: any;
  public displayColumns: string[] = ['Id', 'Title', 'Description', 'StartDate', 'EndDate'];
  constructor(private projectService: ProjectService) {}
  ngOnInit(): void {
    this.loadInitData();
  }
  private loadInitData() {
    this.projectService.getProjects().pipe(take(1), map((projects) => {this.projectDate = projects;
      this.dataSource = new MatTableDataSource(this.projectDate);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;})).subscribe();
  }

}