import {Component, HostListener, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {WeatherService} from './service/weather.service';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-root',
  // imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'weather-app-angular';

  weatherService = inject(WeatherService);
  @HostListener('click') onClick() {
    this.weatherService.fetchWeatherData();
    console.log(this.weatherService.data());
  }
}
