import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpinnerComponent } from '../../reuseables/http-loader/spinner.component';
import { AuthService } from '../../reuseables/auth/auth.service';

import { ReactiveFormsModule,FormsModule, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule, SpinnerComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {


  authService = inject(AuthService)

  async ngOnInit()   {
  // Run JS file
    // loadScript('assets/js/main.js');
    // loadExternalScript()
    if (this.authService.checkLogin()) {
      this.authService.router.navigate(['/']); // or '/dashboard'
    }

    this.authService.setRefCode()
  }

}
