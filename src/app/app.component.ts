import { Component, HostListener, inject } from '@angular/core';

import { Router, NavigationEnd,NavigationStart, RouterOutlet } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import { QuickNavService } from './reuseables/services/quick-nav.service';
import { AppDownloadManager } from './reuseables/services/app-download-manager.service';

import { SwUpdate } from '@angular/service-worker';
import { isDevMode } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FBS';

  quickNav = inject(QuickNavService);
  appManager = inject(AppDownloadManager)

  private swUpdate = inject(SwUpdate);

  updateAvailable = false;
  private swRegistration: ServiceWorkerRegistration | null = null;

  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        // Find the last navigation event to check trigger type
        const nav = this.router.getCurrentNavigation();
        if (nav?.trigger !== 'popstate') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        this.appManager.showDownload()
      });


  }

  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: BeforeUnloadEvent) {
    // Prevent default reload/close
    if (this.quickNav.storeData.get('total_read')) {
      this.quickNav.reqServerData.post('notifications/?hideSpinner', {total_read:this.quickNav.storeData.get('total_read'),processor:'save_read'}).subscribe()
    }
    // event.preventDefault();

    // Standard-compliant browsers ignore the returned string,
    // but this is needed for Chrome/Edge/Firefox to trigger the warning dialog
    event.returnValue = '';

    // Optionally, do something before reload:
    // console.log('User is about to reload or close the page!');
  }


  // ngOnInit(): void {
  //
  //   // Run after every route navigation
  //   this.router.events
  //   .pipe(filter(event => event instanceof NavigationEnd))
  //   .subscribe(() => {this.showDownload()});
  //
  // }
  isIOS(): boolean {
   return /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
  }

  isInStandaloneMode(): boolean {
    return (window.matchMedia('(display-mode: standalone)').matches) ||
           ((navigator as any).standalone === true);
  }

  showDownload(){

      console.log("etting download ");

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
  }
  // async ngOnInit(){
  //   if ('serviceWorker' in navigator) {
  //     console.log("worker enabled");
  //     this.swRegistration = await navigator.serviceWorker.ready;
  //     console.log("ready", this.swRegistration.active, this.swRegistration);
  //   }
  //
  //   // ✅ Register combined service worker manually
  //   // if ('serviceWorker' in navigator && !isDevMode()) {
  //   //   window.addEventListener('load', () => {
  //   //     navigator.serviceWorker
  //   //       .register('/combined-worker.js')
  //   //       .then(reg => console.log('✅ Combined SW registered:', reg))
  //   //       .catch(err => console.error('❌ SW registration failed:', err));
  //   //   });
  //   // }
  //
  //   if (this.swUpdate.isEnabled) {
  //     // 🔄 Listen for updates
  //     this.swUpdate.versionUpdates.subscribe(event => {
  //       if (event.type === 'VERSION_READY') {
  //         this.updateAvailable = true;
  //       }
  //     });
  //   }else{
  //     console.log("service worker nnot enabled");
  //
  //   }
  // }


}
