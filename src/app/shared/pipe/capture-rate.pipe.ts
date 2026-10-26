import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'captureRate',
  standalone: true,
})
export class CaptureRatePipe implements PipeTransform {
  transform(captureRate: number): string {
    const percentage = Math.min(Math.max(captureRate, 0), 255) / 255 * 100;

    return `${percentage.toFixed(2)} %`;
  }
}
