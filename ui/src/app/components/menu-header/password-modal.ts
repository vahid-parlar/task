import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MaterialModule } from '@modules/Material.module';
import { CommonService } from '@services/common/common.service';
import { EMPTY, catchError, map, take } from 'rxjs';
import { PasswordInput } from '@models/password-input';
import { UserService } from '@services/users.service';
export interface DialogData {
  userName: string;
}

@Component({
  selector: 'change-password',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
  ],
  styleUrl: './menu-header.component.scss',

  template: `
    <h2 mat-dialog-title style="direction: rtl;">
      <h2>تغییر رمز ورود</h2>
    </h2>
    <mat-dialog-content>
      <form [formGroup]="passwordForm" style="direction: rtl; box-shadow: none">
        <p>
          <mat-form-field class="w-full">
            <mat-label>رمز ورود فعلی</mat-label>
            <input
              class="pr-5"
              type="password"
              matInput
              placeholder="رمز ورود فعلی"
            />
          </mat-form-field>
        </p>
        <p>
          <mat-form-field class="w-full">
            <mat-label>رمز ورود جدید</mat-label>
            <input
              class="pr-5"
              type="password"
              matInput
              formControlName="newPassword"
              placeholder="رمز ورود جدید"
            />
          </mat-form-field>
        </p>
        <p>
          <mat-form-field class="w-full">
            <mat-label>تکرار رمز ورود جدید</mat-label>
            <input
              class="pr-5"
              type="password"
              matInput
              formControlName="newPasswordRepeat"
              placeholder="تکرار رمز ورود جدید"
            />
          </mat-form-field>
        </p>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions>
      <div class="w-full flex items-center justify-center">
        <button (click)="onNoClick()" mat-raised-button color="accent">
          لغو
        </button>
        <button
          mat-raised-button
          (click)="changePassword()"
          color="primary"
          type="button"
          class="ml-11"
        >
          تغییر رمز
        </button>
      </div>
    </mat-dialog-actions>
  `,
})
export class PasswordComponent {
  readonly dialogRef = inject(MatDialogRef<PasswordComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  constructor(
    private builder: FormBuilder,
    private commonService: CommonService,
    private userService: UserService
  ) {}
  passwordForm = this.builder.group({
    newPassword: this.builder.control('', Validators.required),
    newPasswordRepeat: this.builder.control('', Validators.required),
  });

  onNoClick(): void {
    this.dialogRef.close();
  }
  changePassword() {
    if (this.passwordForm.valid && this._passwordValidator()) {
      const passwordInput: PasswordInput = {
        username: this.data.userName as string,
        newPassword: this.passwordForm.value.newPassword as string,
      };
      this.userService
        .changePassword(passwordInput)
        .pipe(
          take(1),
          map((res) => {
            this.commonService.toastErrorMessage(
              'ثبت با موفقیت انجام شد',
              'success'
            );
            this.onNoClick();
          }),
          catchError((error) => {
            this.commonService.toastErrorMessage(error.error, 'error');
            return EMPTY;
          })
        )
        .subscribe();
    }
  }

  private _passwordValidator() {
    const newPassword = this.passwordForm.value.newPassword as string;
    const newPasswordRepeat = this.passwordForm.value
      .newPasswordRepeat as string;    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{6,}$/;
    const isValidPassword = passwordRegex.test(
      this.passwordForm.value.newPassword as string
    );
    if(!isValidPassword){
      this.commonService.toastErrorMessage(
        'رمز ورود باید شامل عدد و حرف و کاراکتر خاص باشد',
        'error'
      );
      return false;
    }
    if(newPassword !== newPasswordRepeat){
      this.commonService.toastErrorMessage(
        'رمز ورود با تکرار آن مطابقت ندارد',
        'error'
      );
      return false;
    }
    return true;
  }
}
