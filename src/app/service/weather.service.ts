import {AfterViewInit, HostListener, inject, Injectable, OnInit, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root',

})
export class WeatherService implements OnInit{
  private APIURL = `https://api.open-meteo.com/v1/forecast?latitude=30.18&longitude=71.49&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&hourly=temperature_2m,weathercode&timezone=auto
`;

  private httpClient = inject(HttpClient);
  data = signal({});


  constructor() {
    console.log(environment.apiKey);

  }

  ngOnInit() {
    // This will be called when the service is instantiated
    this.fetchWeatherData();
  }

  // Method to fetch weather data
  fetchWeatherData() {
    this.httpClient.get(this.APIURL).subscribe({
      next: (res) => {
        this.data.set(res);
        console.log('Weather data fetched');
      },
      error: (err) => {
        console.error('Error fetching weather data', err);
      }
    });
  }
}
