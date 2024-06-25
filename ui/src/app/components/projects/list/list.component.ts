import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { ProjectResult } from '@models/project-result';
import { MaterialModule } from '@modules/Material.module';
import { ProjectService } from '@services/projects.service';
import { JalaaliPipe } from 'app/shared/jalaali.pipe';
import { plainToClass } from 'class-transformer';
import { forkJoin, map, take } from 'rxjs';
import { AddMemberComponent } from './member/addMember';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '@services/users.service';
import { User } from '@models/user';
@Component({
  selector: 'project-list',
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterLink, JalaaliPipe],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ProjectListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public projectDate!: ProjectResult[];
  public userList!: User[];
  public dataSource: any;
  public displayColumns: string[] = [
    'id',
    'title',
    'description',
    'startDate',
    'endDate',
  ];
  selectedRowIndex: number = -1;
  readonly dialog = inject(MatDialog);

  constructor(
    private projectService: ProjectService,
    private userService: UserService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loadInitData();
  }

  private loadInitData() {
    forkJoin([
      this.projectService.getProjects().pipe(
        take(1),
        map((projects) => plainToClass(ProjectResult, projects))
      ),
      this.userService.getUsers().pipe(
        take(1),
        map((res) => res)
      ),
    ]).subscribe(([projects, users]) => {
      this.projectDate = projects;
      this.dataSource = new MatTableDataSource(projects);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.userList = users;
    });
  }
  highlight(index: number) {
    this.selectedRowIndex = index;
  }
  onAddNewMember() {
    console.log(this.userList);

    var project = this.projectDate[this.selectedRowIndex];
    const dialogRef = this.dialog.open(AddMemberComponent, {
      data: {
        projectTitle: project.title,
        projectId: project.id,
        userList: this.userList,
      },
      height: '600px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
  onAddNewTask() {
    var project = this.projectDate[this.selectedRowIndex];
    this.router.navigate([`add-task/${project.id}`]);
  }
}
