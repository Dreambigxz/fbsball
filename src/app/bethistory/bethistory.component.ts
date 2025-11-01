import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Header2Component } from '../components/header2/header2.component';
import { BetHistoryService } from '../reuseables/services/bet-history.service';
import { CurrencyConverterPipe } from '../reuseables/pipes/currency-converter.pipe';
import { CountdownPipe } from '../reuseables/pipes/countdown.pipe';

import { FormBuilder, FormGroup , ReactiveFormsModule} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

import { SpinnerComponent } from '../reuseables/http-loader/spinner.component';
// import { StoreDataService } from '../../reuseables/http-loader/store-data.service';
import { RequestDataService } from '../reuseables/http-loader/request-data.service';

import { MenuBottomComponent } from "../components/menu-bottom/menu-bottom.component";

import { RouterLink, Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-bethistory',
  standalone: true,
  imports: [
      Header2Component, CommonModule,
      CurrencyConverterPipe, CountdownPipe,SpinnerComponent,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatButtonModule,
      MenuBottomComponent
    ],
  templateUrl: './bethistory.component.html',
  styleUrls: ['./bethistory.component.css']
})
export class BethistoryComponent implements OnInit {

  private historyService = inject(BetHistoryService);

  // storeData = inject(StoreDataService)
  reqServerData = inject(RequestDataService)

  pageName = 'Bet History';
  activeTab: 'openbet' | 'settled' = 'openbet';
  subTab: 'won' | 'loss' | 'cancel' = 'won';

  tickets: any[] = [];
  expandedTicketId: number | null = null; // for dropdown toggle

  subDisplay:any[]=[];subDisplayInit=false
  openBetDisplay:any
  historyServiceLoaded:any

  filterForm: FormGroup;

  router=inject(Router)


  constructor(private fb: FormBuilder) {
    const today = new Date();
    const last7 = new Date();
    last7.setDate(today.getDate() - 7);

    this.filterForm = this.fb.group({
      range: this.fb.group({
        start: [last7],
        stop: [today],
      }),
    });
  }


  /** Switch between won/loss/cancelled sub-tabs */
  selectSubTab(tab: 'won' | 'loss' | 'cancel' ) {

      this.subTab = tab;
      this.subDisplay=this.historyServiceLoaded.filterBets(tab)
  }

  /** Toggle expand/collapse for ticket details */
  toggleExpand(ticketId: number): void {
    this.expandedTicketId = this.expandedTicketId === ticketId ? null : ticketId;
  }

  settledClick(){
    this.activeTab = 'settled';
    !this.subDisplayInit?this.selectSubTab("won"):0
    console.log('subDisplay>>',this.subDisplay);
    this.subDisplayInit=true

  }

  /** Lifecycle hook — fetch ticket history */
  async ngOnInit(): Promise<void> {
    try {
      const result = await this.historyService.getHistory('all');
      this.historyServiceLoaded=this.historyService
      this.tickets = Array.isArray(result) ? result : [];

      this.historyService.openBetDisplay=this.historyServiceLoaded.filterBets('open')

    } catch (error) {
      console.error('Error loading bet history:', error);
      this.tickets = []; // fallback to empty
    }

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
      if (event.urlAfterRedirects.includes('bethistory')) {
        this.historyService.getHistory()
        this.historyService.openBetDisplay=this.historyServiceLoaded.filterBets('open',true)
      }
    });
  }


  setProfit(bet:any){
    const totalProfit = (bet.stake_amount * bet.market_odds / 100 )
    return (totalProfit + bet.stake_amount).toFixed(2)
  }

  filterByDate() {
    const { start, stop } = this.filterForm.value.range;
    if (!start || !stop) return;
    this.reqServerData.post('bet/?showSpinner',{start,stop,processor:'update_main'}).subscribe()
  }
}
