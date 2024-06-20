import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Project } from '@models/project';
import { MaterialModule } from '@modules/Material.module';
import { ProjectService } from '@services/projects.service';
import { take } from 'rxjs';

@Component({
  selector: 'add-project',
  standalone: true,
  imports: [MaterialModule, RouterLink, ReactiveFormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
})
export class AddProjectComponent implements OnInit {
  constructor(
    private builder: FormBuilder,
    private projectService: ProjectService,
    private activatedRouter: ActivatedRoute
  ) {}
  ngOnInit(): void {
    // this._loadProject();
  }
  public pageTitle: string = 'Add Project';
  public id: string | null = null;

  projectForm = this.builder.group({
    title: this.builder.control('', Validators.required),
    description: this.builder.control('', Validators.required),
    startDate: this.builder.control(new Date(), Validators.required),
    endDate: this.builder.control(new Date(), Validators.required),
  });

  // private _loadProject() {
  //   this.id = this.activatedRouter.snapshot.paramMap.get('id') as string;
  //   if (this.id != null && this.id != '') {
  //     this.pageTitle = 'Update Project';
  //     this.projectService
  //       .getProject(this.id)
  //       .pipe(
  //         take(1),
  //         map((project) => {
  //           this.projectForm.setValue({
  //             code: project?.firstName || '',
  //             name: project?.lastName || '',
  //             email: project?.email || '',
  //             phone: project?.mobile || '',
  //           });
  //         })
  //       )
  //       .subscribe();
  //   }
  // }

  SaveProject() {
    if (this.projectForm.valid) {
      const project: Project = {
        Title: this.projectForm.value.title as string,
        Description: this.projectForm.value.description as string,
        StartDate: this.projectForm.value.startDate as Date,
        EndDate: this.projectForm.value.endDate as Date,
      };
      // if (this.id == null) {
        this.projectService.addProject(project).pipe(take(1)).subscribe();
      // } else {
      //   project.id = this.id;
      //   this.projectService.updateProject(project).pipe(take(1)).subscribe();
      // }
    }
  }
}
