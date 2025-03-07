import {
  Component,
  computed,
  effect,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { WeatherService } from '../../service/weather.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: '[app-left-panel]',
  imports: [DatePipe],
  templateUrl: './left-panel.component.html',
  styleUrl: './left-panel.component.scss',
})
export class LeftPanelComponent {
  place = input.required<string>();
  date = signal<string>(new Date().toLocaleDateString('de-DE'));
  weatherService = inject(WeatherService);

  constructor() {
    effect(() => {
      const weatherData = this.weatherService.data();
      this.date.set(weatherData?.current_weather.time || this.date());
    });
  }
}
