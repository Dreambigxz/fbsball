import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrencyConverterPipe } from '../../reuseables/pipes/currency-converter.pipe';
import { StoreDataService } from '../../reuseables/http-loader/store-data.service';
import { QuickNotificationsComponent } from "../quick-notifications/quick-notifications.component";

import { Router, RouterLink, NavigationEnd, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-header2',
  imports: [CommonModule,CurrencyConverterPipe,QuickNotificationsComponent],
  templateUrl: './header2.component.html',
  styleUrl: './header2.component.css'
})
export class Header2Component {

  storeData = inject(StoreDataService)
  pageName = location.pathname.replaceAll("/","")

  router = inject(Router)

  goBack(){
    this.pageName === 'confirm-payment'?this.router.navigate(['/']):window.history.go(-1)
  }

  ngOnInit() {
    this.segments(location.pathname.split('/'))
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.segments(event.urlAfterRedirects.split('/'))
      }
    });
  }

  segments(segments:any){
     segments.includes("betinfo")?this.pageName="betinfo": this.pageName=segments.pop() || ''; // 'earnings'
  }


}
