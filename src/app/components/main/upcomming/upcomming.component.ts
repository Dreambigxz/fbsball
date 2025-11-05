import { AfterViewInit, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// ✅ Correct Swiper imports for Angular
// import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
// import Swiper from 'swiper';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

import { StoreDataService } from '../../../reuseables/http-loader/store-data.service';
import { RequestDataService } from '../../../reuseables/http-loader/request-data.service';
import { MatchService } from '../../../reuseables/services/match.service';
import { TimeFormatPipe } from '../../../reuseables/pipes/time-format.pipe';
import { CountdownPipe } from '../../../reuseables/pipes/countdown.pipe';

import { loadScript, padNum } from '../../../reuseables/helper';

@Component({
  selector: 'app-upcomming',
  standalone: true,
  imports: [CommonModule, TimeFormatPipe,CountdownPipe],
  templateUrl: './upcomming.component.html',
  styleUrls: ['./upcomming.component.css']
})
export class UpcommingComponent implements AfterViewInit {
  storeData = inject(StoreDataService);
  reqServerData = inject(RequestDataService);
  router = inject(Router);
  matchService = inject(MatchService);

  upcomingMatches: any;

  // ✅ Correct typing for Swiper instance
  swiper?: InstanceType<typeof Swiper>;
  slidesLoaded = false;

  async ngOnInit() {
    if (!this.storeData.get('soccer')) {
      this.reqServerData.get('soccer/?showSpinner').subscribe({
        next: (res) => {
          this.setData()
        }
      });
    } else {
      this.setData()
    }
  }

  async setData(): Promise<void>{

    this.matchService.setFixtures()
    this.matchService.upcoming(this.storeData.store['soccer']);

  }

  ngAfterViewInit(): void {
    const checkInterval = setInterval(() => {
      const slides = document.querySelectorAll('.swiper-slide');
      if (slides.length > 0) {
        clearInterval(checkInterval);
        this.initSwiper();
      }
    }, 200);
  }

  private initSwiper(): void {
    if (this.swiper) {
      this.swiper.destroy(true, true);
    }

  this.swiper = new Swiper('.live-playing', {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    freeMode: true, // ✅ smooth continuous scrolling
    speed: 10000, // ✅ control how fast it moves (lower = slower)
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      768: { slidesPerView: 1 },
      1024: { slidesPerView: 2 },
    },
    on: {
      slideChangeTransitionEnd(swiper: any) {
        swiper.updateSlidesClasses();
      },
    },
  });
  // this.swiper.autoplay.start();
  // setTimeout(() => {
  //
  //   this.swiper.update();
  //   this.swiper.autoplay.start();
  // }, 300);
}



}
