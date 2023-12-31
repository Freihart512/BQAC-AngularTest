import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/@core/authentication/services/auth.service';
import { Credentials, LoginResponse } from 'src/app/shared/interfaces/Login';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})

export class SignInComponent implements OnInit {
  @ViewChild("password") password!: ElementRef;
  @ViewChild("show") show !: ElementRef ;
  @ViewChild("hide") hide !: ElementRef ;
  
  formLogin!: FormGroup;
  invalidCredentials: boolean = false;
  //singInCall!: ApiService;
  // data: any = null;
  // loading: any = false
  // count = 0

  constructor( private fb: FormBuilder,
    private renderer: Renderer2,
    private router: Router,
    private localStorageService: LocalStorageService,
    public authService: AuthService) { }

  ngOnInit(): void {
    this.createForm();
  }


  createForm(): void {
    this.formLogin = this.fb.group({
      email: ["", [Validators.required, Validators.pattern('[A-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ["", Validators.required]
    });
  }
  
  /***Getters para campos invalidos  **/
  get invalidEmail() {
    return this.formLogin?.get('email')?.invalid && this.formLogin.get('email')?.touched;
  }

  get invalidPassword() {
    return this.formLogin?.get('password')?.invalid && this.formLogin.get('password')?.touched;
  }
  /***FIN de Getters para campos invalidos  **/

  showPsw() {
    if (this.password?.nativeElement.type == "password") {
      this.renderer.setAttribute(this.password.nativeElement, "type", "text");
      this.renderer.setStyle(this.show?.nativeElement, "visibility", "hidden");
      this.renderer.setStyle(this.hide?.nativeElement, "visibility", "visible")
    } else {
      this.renderer.setAttribute(this.password?.nativeElement, "type", "password");
      this.renderer.setStyle(this.show?.nativeElement, "visibility", "visible");
      this.renderer.setStyle(this.hide?.nativeElement, "visibility", "hidden")
    }
  }

  redirectByRole(role: string) {
    switch (role) {
      case "mesera":
        this.router.navigate(['orders/create'])
        break;

      case "cocinera":
      
      break;

      case "admin":
        
        break;
    
      default:
        break;
    }
  }

  signIn(): void {
    this.invalidCredentials = false;

    if (this.formLogin?.invalid) {
      return Object.values(this.formLogin.controls)
        .forEach(control => control.markAsTouched());
    } else {
      this.authService.sigIn(this.formLogin.value)
    }
  }

  // async onLoginFormSubmit() {
  //   try {
  //     const resp = await this.authService.sigIn(this.formLogin.value as Credentials).toPromise();
  //     this.localStorageService.setStorage("accessToken", resp.accessToken);
  //     this.localStorageService.setStorage("role", resp.user.role);
  //     this.localStorageService.setStorage("idUser", resp.user.id.toString());

  //     this.redirectByRole(resp.user.role);
  //   } catch (error) {
  //     //manejo del error
  //   }
  // }

}
