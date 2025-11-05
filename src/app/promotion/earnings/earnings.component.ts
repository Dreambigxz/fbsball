import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrencyConverterPipe } from '../../reuseables/pipes/currency-converter.pipe';
import { SpinnerComponent } from '../../reuseables/http-loader/spinner.component';
import { Header2Component } from "../../components/header2/header2.component";

import { StoreDataService } from '../../reuseables/http-loader/store-data.service';
import { RequestDataService } from '../../reuseables/http-loader/request-data.service';

import { TruncateCenterPipe } from '../../reuseables/pipes/truncate-center.pipe';
import { WalletService } from '../../reuseables/services/wallet.service';

import { QuickNavService } from '../../reuseables/services/quick-nav.service';

import { MenuBottomComponent } from "../../components/menu-bottom/menu-bottom.component";

@Component({
  selector: 'app-earnings',
  imports: [
    CommonModule,CurrencyConverterPipe,
    SpinnerComponent,Header2Component,
    TruncateCenterPipe,MenuBottomComponent
  ],
  templateUrl: './earnings.component.html',
  styleUrl: './earnings.component.css'
})
export class EarningsComponent {


  walletService = inject(WalletService);
  quickNav = inject(QuickNavService)

  tabs = ['Referral', 'Rebate', 'Deposit', 'Withdraw', 'Commission'];
  usersTab = [ "Generation1", "Generation2", "Generation3"]

  activeTab = 'Earnings';
  subEarningTab = 'Referral';
  subUsersTab = 'Generation1';

  activeMainTab = "Earnings"

  subTab:any

  subUsersContent:any=[]
  refLink:any

  ngOnInit(){
      if (!this.quickNav.storeData.get('refDir')) {this.quickNav.reqServerData.get("promotions/").subscribe(
        (res)=>{
          this.makeRefLink()
          console.log({res});

        }
      )}
  }

  MainTablistener(tab:any){
    this.activeTab=tab
    if (tab==="Users"&&!this.quickNav.storeData.get('promotionLevel_1')) {
      this.loadUsers("Generation1")
    }
  }

  loadUsers(tab:any, generation:any=null){
    generation = generation || tab[tab.length-1]
    this.subUsersTab=tab
    if (!this.quickNav.storeData.get('promotionLevel_'+generation)) {
          this.quickNav.reqServerData.get('promotions/?level='+generation).subscribe({next: res => {
            this.subUsersContent = this.quickNav.storeData.get('promotionLevel_'+generation)
          }})
      }else{
        this.subUsersContent = this.quickNav.storeData.get('promotionLevel_'+generation)
      }

  }

  makeRefLink() {
    const RefCode = this.quickNav.storeData.get('refDir')['RefCode'];
    this.refLink = `${window.location.origin}/register?affiliate=${RefCode}`;
  }
}
