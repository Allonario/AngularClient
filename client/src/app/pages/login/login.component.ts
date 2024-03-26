import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../services/login.service";
import {Login} from "../../models/login.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService,  private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log('Form submitted!');
    if (this.loginForm.valid) {
      const loginData: Login = this.loginForm.value;
      console.log(loginData)
      this.loginService.loginUser(loginData).subscribe(
        (response) => {
          console.log('Success')
          console.log(response.id)
          this.router.navigate(['/profile', response.id]);

        },
        (error) => {
          console.log(error.message())
        }
      );
    }
  }
}
