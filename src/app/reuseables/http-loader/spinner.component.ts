import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderService } from './loader.service';
import { Observable, of} from 'rxjs';

// <div class="spinner"></div>
// <div *ngIf="isLoading | async" class="spinner-overlay"> <div class="spinner"></div> </div>
@Component({
  selector: 'app-spinner',
  imports: [ CommonModule],

  template: `

  <div *ngIf="isLoading | async"  id="spinner-div" class="pt-5">
  <div id="loading-bar-spinner" class="spinner"><div class="spinner-icon"></div></div>

  </div>
  `,
  styles: [`
    #spinner-div {
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      text-align: center;
      /* background-color: rgba(255, 255, 255, 0.8); */
      background-color: rgba(0, 0, 0, 0.43);
      z-index: 999999999;
    };
    #spinner-div{animation-delay: 500ms}

    #spinner-div .spinner-grow.text-primary{
      margin-top:50%
    }

    #loading-bar-spinner.spinner {
      left: 50%;
      margin-left: -20px;
      top: 50%;
      margin-top: -20px;
      position: absolute;
      z-index: 19 !important;
      animation: loading-bar-spinner 400ms linear infinite;
  }

  #loading-bar-spinner.spinner .spinner-icon {
      width: 40px;
      height: 40px;
      border:  solid 1px rgb(var(--g1));
      border-top-color:  transparent;
      border-left-color: transparent;
      border-radius: 50%;
      /* background-image: url('static/assets/images/logo.svg'); */
  }

  @keyframes loading-bar-spinner {
    0%   { transform: rotate(0deg);   transform: rotate(0deg); }
    100% { transform: rotate(360deg); transform: rotate(360deg); }
  }
  `]
})
export class SpinnerComponent {
    isLoading: Observable<boolean>;
   constructor(private loaderService: LoaderService) {
     this.isLoading = this.loaderService.loading$; // ✅ safe
   }

}
