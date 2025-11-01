import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpinnerComponent } from '../../reuseables/http-loader/spinner.component';
import { AuthService } from '../../reuseables/auth/auth.service';

import { ReactiveFormsModule,FormsModule, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-reset',
  imports: [
    CommonModule, SpinnerComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.css'
})
export class ResetComponent {

  authService = inject(AuthService)

  async ngOnInit()   {
  // Run JS file
    // loadScript('assets/js/main.js');
    // loadExternalScript()
    if (this.authService.checkLogin()) {
      this.authService.router.navigate(['/']); // or '/dashboard'
    }
  }

}
