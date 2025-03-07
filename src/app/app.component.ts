import { Component, HostListener, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherService } from './service/weather.service';
import { HttpClient } from '@angular/common/http';
import { LeftPanelComponent } from './components/left-panel/left-panel.component';

@Component({
  selector: 'app-root',
  // imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [LeftPanelComponent],
})
export class AppComponent {
  title = 'weather-app-angular';
  place = 'tambaram';
  weatherService = inject(WeatherService);
  @HostListener('click') onClick() {
    this.weatherService.getWeatherData(this.place);
    console.log(this.weatherService.data());
  }
}
