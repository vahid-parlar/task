import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RegisterInput } from '@models/register-input';
import { MaterialModule } from '@modules/Material.module';
import { CommonService } from '@services/common/common.service';
import { UserService } from '@services/users.service';
import { EMPTY, catchError, map, take } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(
    private userService: UserService,
    private commonService: CommonService,
    private router: Router,
    private _formBuilder: UntypedFormBuilder
  ) {}
  form: UntypedFormGroup = this._formBuilder.group({
    username: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    mobile: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    
  });

  submit() {
    if (this.form.valid && this._emailAndPhoneNumberValidator()) {
      const registerInput = new RegisterInput();
      registerInput.username = this.form.value.username as string;
      registerInput.firstName = this.form.value.firstName as string;
      registerInput.lastName = this.form.value.lastName as string;
      registerInput.mobile = this.form.value.mobile as string;
      registerInput.email = this.form.value.email as string;
      registerInput.password = this.form.value.password as string;

      this.userService
        .register(registerInput)
        .pipe(
          take(1),
          map((res) => {
            this.commonService.toastErrorMessage(
              'ثبت نام با موفقیت انجام شد',
              'success'
            );
            this.router.navigate(['/login']);
          }),
          catchError((error) => {
            this.commonService.toastErrorMessage(error.error, 'error');
            return EMPTY;
          })
        )
        .subscribe();
    }
  }
  private _emailAndPhoneNumberValidator(): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^09\d{9}$/;

    const isValidEmail = emailRegex.test(this.form.value.email as string);
    const isValidPhone = phoneRegex.test(this.form.value.mobile);

    if (!isValidEmail || !isValidPhone) {
      this.commonService.toastErrorMessage("ایمیل یا شماره تلفن وارد شده صحیح نمیباشد", 'error');
      return false;
    }

    return true;
  }
}
