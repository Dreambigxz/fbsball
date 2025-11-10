import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrencyConverterPipe } from '../../reuseables/pipes/currency-converter.pipe';
import { SpinnerComponent } from '../../reuseables/http-loader/spinner.component';
import { StoreDataService } from '../../reuseables/http-loader/store-data.service';
import { RequestDataService } from '../../reuseables/http-loader/request-data.service';
import { Header2Component } from "../../components/header2/header2.component";

@Component({
  selector: 'app-rewards',
  imports: [
      CommonModule,CurrencyConverterPipe,
      SpinnerComponent,Header2Component,
],
  templateUrl: './rewards.component.html',
  styleUrl: './rewards.component.css'
})
export class RewardsComponent {

  storeData = inject(StoreDataService)
  reqServerData = inject(RequestDataService)


  ngOnInit(){
      this.storeData.store['pageDetails']='promotions'
      if (!this.storeData.get('invite-rewards')) {this.reqServerData.get("invite-rewards?showSpinner").subscribe()}
  }

}
