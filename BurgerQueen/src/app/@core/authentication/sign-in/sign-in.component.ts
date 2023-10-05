import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/@core/authentication/services/auth.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent implements OnInit {
  formLogin!: FormGroup;
  invalidCredentials: boolean = false;

  attrsToShowPassword = {
    inputPasswordType: 'password',
    iconClass: 'far fa-eye'
  };
  isLoading: Boolean = false;
  error: HttpErrorResponse | Error | null = null;

  constructor( private fb: FormBuilder, public authService: AuthService) { }

  ngOnInit(): void {
    this.createForm();

    this.authService.loginResponse$.subscribe(state => {
      this.isLoading = state.isLoading
      this.error = state.error
      
      this.invalidCredentials = (this.error instanceof HttpErrorResponse) && this.error.error === "Incorrect password";
    })
  }

  ngOnDestroy() {
    if (this.authService.loginResponse$) {
      this.authService.loginResponse$.unsubscribe();
    }
  }

  createForm(): void {
    this.formLogin = this.fb.group({
      email: ["", [Validators.required, Validators.pattern('[A-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ["", Validators.required]
    });
  }
  
  isFieldInvalid(fieldName: string) {
    return (
      this.formLogin?.get(fieldName)?.invalid &&
      this.formLogin.get(fieldName)?.touched
    );
  }

  showPsw() {
    const passwordViewOps = {
      inputPasswordType: 'text',
      iconClass: 'far fa-eye-slash'
   };
   const passwordOps = {
      inputPasswordType: 'password',
      iconClass: 'far fa-eye'
    }
   this.attrsToShowPassword = this.attrsToShowPassword.inputPasswordType == "password" ? passwordViewOps : passwordOps;
  }

  signIn(): void {
    this.invalidCredentials = false;

    if (this.formLogin?.invalid) {
      return Object.values(this.formLogin.controls)
        .forEach(control => control.markAsTouched());
    } else {
      this.authService.login(this.formLogin.value)
    }
  }

}
