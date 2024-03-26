import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {RegistrationService} from "../../services/registration.service";
import {Registration} from "../../models/registration.model";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})

export class RegistrationComponent {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private registrationService: RegistrationService,  private router: Router) {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log('Form submitted!');
    if (this.registrationForm.valid) {
      const registrationData: Registration = this.registrationForm.value;
      console.log(registrationData)
      this.registrationService.registerUser(registrationData).subscribe(
        (response) => {
          console.log('Success')
          this.router.navigate(['/profile', response.id]);

        },
        (error) => {
          console.log(error)
        }
      );
    }
  }
}
