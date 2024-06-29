import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { MaterialModule } from '@modules/Material.module';
import { JalaaliPipe } from 'app/shared/jalaali.pipe';
import { plainToClass } from 'class-transformer';
import { forkJoin, map, take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { User } from '@models/user';
import { TaskService } from '@services/tasks.service';
import { TaskInput } from '@models/task-input';
import { TaskResult, TaskStatus } from '@models/task-result';
import { TranslateEnumPipe } from 'app/shared/translateenum.pipe';
import { ChangeStatusComponent } from './changeStatus';
@Component({
  selector: 'task-list',
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterLink, JalaaliPipe,TranslateEnumPipe],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class TaskListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public taskDate!: TaskResult[];
  public userList!: User[];
  public dataSource: any;
  public displayColumns: string[] = [
    'id',
    'title',
    'description',
    'priority',
    'deadLine',
    'projectTitle',
    'taskStatus'
  ];
  selectedRowIndex: number = -1;
  readonly dialog = inject(MatDialog);
  statusEnum = TaskStatus;

  constructor(private taskService: TaskService, private router: Router) {}
  ngOnInit(): void {
    this.loadInitData();
  }

  private loadInitData() {
    var taskInput = new TaskInput();
    forkJoin([
      this.taskService.getTasks(taskInput).pipe(
        take(1),
        map((tasks) => plainToClass(TaskResult, tasks))
      ),
    ]).subscribe(([tasks]) => {
      this.taskDate = tasks;
      this.dataSource = new MatTableDataSource(tasks);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  highlight(index: number) {
    this.selectedRowIndex = index;
  }
  onChangeTaskStatus() {
      var task = this.taskDate[this.selectedRowIndex];
      const dialogRef = this.dialog.open(ChangeStatusComponent, {
        data: {
          taskTitle: task.title,
          taskId: task.id,
          taskStatus: task.TaskStatus,
        },
        height: '500px',
        width: '500px',
      });
      dialogRef.afterClosed().subscribe((result) => {
        this.loadInitData();
      });
  }
}