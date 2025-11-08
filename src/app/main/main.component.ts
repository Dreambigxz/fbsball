import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from "../components/header/header.component";
import { SliderComponent } from "../components/main/slider/slider.component";
import { UpcommingComponent } from "../components/main/upcomming/upcomming.component";
import { SecuredComponent } from "../components/main/secured/secured.component";

import { RequestDataService } from '../reuseables/http-loader/request-data.service';
import { StoreDataService } from '../reuseables/http-loader/store-data.service';

import { MenuBottomComponent } from "../components/menu-bottom/menu-bottom.component";
import { QuickNotificationsComponent } from "../components/quick-notifications/quick-notifications.component";
import { SpinnerComponent } from '../reuseables/http-loader/spinner.component';
import { QuickNavService } from '../reuseables/services/quick-nav.service';

import { AppDownloadManager } from '../reuseables/services/app-download-manager.service';

@Component({
  selector: 'app-main',
  imports: [
    HeaderComponent, SliderComponent,
     UpcommingComponent, MenuBottomComponent,
     CommonModule,
     QuickNotificationsComponent,
     SpinnerComponent,SecuredComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  storeData = inject(StoreDataService)
  reqServerData = inject(RequestDataService)

  quickNav = inject(QuickNavService)
  appManager = inject(AppDownloadManager)

}
