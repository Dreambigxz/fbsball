import { Injectable, inject } from '@angular/core';
import { StoreDataService } from '../http-loader/store-data.service';
import { ConfirmationDialogService } from '../modals/confirmation-dialog/confirmation-dialog.service';
import { RequestDataService } from '../http-loader/request-data.service';
import { CurrencyConverterPipe } from '../pipes/currency-converter.pipe';

@Injectable({
  providedIn: 'root'
})
export class BetHistoryService {

  private currencyConverter = inject(CurrencyConverterPipe);
  private storeData = inject(StoreDataService);
  private reqConfirmation = inject(ConfirmationDialogService);
  private reqServerData = inject(RequestDataService);

  allBets: any[] = []; // keep your fetched bets here
  openBetDisplay:any
  /**
   * Get bet history filtered by status.
   * @param status - could be 'open', 'settled', 'won', 'lost', etc.
   */
  async getHistory(status: string='all'): Promise<any[]> {
    // ✅ If already loaded, no need to refetch
    if (this.allBets.length) {
      this.allBets = this.storeData.get('betDir')?.ticket || [ ]
      return this.filterBets(status);
    }

    // ✅ Otherwise, wait for backend
    try {
      const res: any = await this.reqServerData.get('bet/?showSpinner').toPromise();
      // console.log(res);

      this.allBets = res?.main?.betDir?.ticket || [
        // fallback mock data if server returns empty
        { id: 1, match: 'Man Utd vs Arsenal', status: 'open', stake: 50, win: 0 },
        { id: 2, match: 'Chelsea vs City', status: 'won', stake: 40, win: 120 },
        { id: 3, match: 'Madrid vs Barca', status: 'lost', stake: 30, win: 0 },
        { id: 4, match: 'PSG vs Lyon', status: 'settled', stake: 25, win: 60 },
      ];
      return this.filterBets(status);
    } catch (err) {
      console.error('Error fetching bet history:', err);
      return [];
    }
  }

  private filterBets(status: string,allBets:any=null) {

    if (!status || status === 'all') {
      return this.allBets;
    }

    const filtered = this.allBets.filter((bet:any) => bet.status === status);

    return filtered

  }

  //
  CanCancel(ticket:any){
    const now = new Date()
    return ticket.status==='open'&&new Date(ticket.start_date)>now
  }

  CancelTicket(ticket:any){
    this.reqConfirmation.confirmAction(()=>{
      this.reqServerData.post('bet/?showSpinner',{ticket_id:ticket.ticket_id,processor:'cancel_bet'}).subscribe({
        next: res =>{
           this.allBets = this.storeData.get('betDir').ticket
          this.openBetDisplay = this.filterBets('open')

         }
      })
    }, "Delete" , "Are you sure you want to cancel this ticket ?")

  }


}
