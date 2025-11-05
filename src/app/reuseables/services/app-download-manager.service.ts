import { Injectable, inject } from '@angular/core';
import { QuickNavService } from '../services/quick-nav.service'; // ✅ adjust path as needed


@Injectable({ providedIn: 'root' })
export class AppDownloadManager {
  constructor() {}

  quickNav= inject(QuickNavService)
  installPromptEvent:any
  modal:any


  isIOS(): boolean {
   return /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
  }

  isInStandaloneMode(): boolean {
    return (window.matchMedia('(display-mode: standalone)').matches) ||
           ((navigator as any).standalone === true);
  }

  showDownload(){

      if (this.isIOS() && !this.isInStandaloneMode()) {
        this.quickNav.storeData.set('installIOS',true)
        this.quickNav.storeData.set('device','IOS')

      } else {
        window.addEventListener('beforeinstallprompt', (event) => {
            event.preventDefault();
            this.quickNav.storeData.set('installPromptEvent',event)
            this.quickNav.storeData.set('can_download_app',true)
            this.quickNav.storeData.set('device','Android')
        });
    }

    console.log("setting download>>> ", this.quickNav.storeData.get('device'));

  }

  installApp() {

    const device = this.quickNav.storeData.get('device')

    if (device==="IOS") {
      this.openModal()
    }else{
      this.installPromptEvent= this.quickNav.storeData.get('installPromptEvent')
      if (this.installPromptEvent) {
        this.installPromptEvent.prompt();
        this.installPromptEvent.userChoice.then((choiceResult: any) => {
          if (choiceResult.outcome === 'accepted') {
            this.quickNav.storeData.store['can_download_app']=false
          }
          this.installPromptEvent = null;
        });
      }
    }

  }

  openModal() {
    const modalEl = document.getElementById('iosPwaModal');
    if (modalEl) {
      this.modal = new (window as any).bootstrap.Modal(modalEl);
      this.modal.show();
    }
  }

}
