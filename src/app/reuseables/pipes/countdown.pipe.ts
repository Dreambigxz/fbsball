import { Pipe, PipeTransform, ChangeDetectorRef } from '@angular/core';
import { interval, map, of, startWith, takeWhile } from 'rxjs';

@Pipe({
  name: 'countdown',
  standalone: true,
  pure: false
})
export class CountdownPipe implements PipeTransform {
  constructor(private cdr: ChangeDetectorRef) {}

  transform(targetDate: Date | string | number, addHours: number = 0) {
    if (!targetDate) return of(null);

    const start = new Date(
      typeof targetDate === 'number'
        ? targetDate * 1000
        : typeof targetDate === 'string' && /^\d+$/.test(targetDate)
          ? parseInt(targetDate) * 1000
          : targetDate
    ).getTime();

    const settleAt = addHours ? start + addHours * 60 * 60 * 1000 : start;

    return interval(1000).pipe(
      startWith(0),
      map(() => {
        const now = Date.now();
        const diff = settleAt - now;

        if (diff <= 0) return null;

        const totalSeconds = Math.floor(diff / 1000);
        const days = Math.floor(totalSeconds / (3600*24));
        let hours,minutes,seconds;
        if (days) {
          hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
          minutes = Math.floor((totalSeconds % 3600) / 60);
          seconds = totalSeconds % 60;
        }else{
           hours = Math.floor(diff / (1000 * 60 * 60));
           minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          seconds = Math.floor((diff % (1000 * 60)) / 1000);

        }

        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');

        this.cdr.markForCheck(); // ✅ tell Angular it’s okay

        return `${days?days+'d':''} ${hours}h ${formattedMinutes}m ${formattedSeconds}s`;
      }),
      takeWhile((val) => val !== null, true)
    );
  }
}
