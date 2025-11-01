import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatchService } from '../reuseables/services/match.service';
import { CurrencyConverterPipe } from '../reuseables/pipes/currency-converter.pipe';
import { SpinnerComponent } from '../reuseables/http-loader/spinner.component';
import { Header2Component } from "../components/header2/header2.component";
import { MenuBottomComponent } from "../components/menu-bottom/menu-bottom.component";

import { TimeFormatPipe } from '../reuseables/pipes/time-format.pipe';
import { TruncateCenterPipe } from '../reuseables/pipes/truncate-center.pipe';

import { Router } from '@angular/router';
import { ReactiveFormsModule,FormsModule, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-matches',
  imports: [
    CommonModule,CurrencyConverterPipe,
    SpinnerComponent,Header2Component, MenuBottomComponent,
    TimeFormatPipe,TruncateCenterPipe,FormsModule
  ],
  templateUrl: './matches.component.html',
  styleUrl: './matches.component.css'
})
export class MatchesComponent {

  matchService = inject(MatchService);
  router = inject(Router);

  notStarted:any=[]

  ngOnInit(): void {
    if (!this.matchService.storeData.get('soccer')) {
      this.matchService.reqServerData.get('soccer/?showSpinner').subscribe({
        next: (res) => {
          console.log({res});

          this.setData()
        }
      });
    }else{
      this.setData()
    }
  }

  async setData():Promise<void> {
    this.matchService.setFixtures()
    this.matchService.filteredMatches$ = await this.matchService.notStarted(this.matchService.storeData.store['soccer']);
  }
}
