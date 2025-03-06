import {AfterViewInit, HostListener, inject, Injectable, OnInit, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {switchMap,of} from 'rxjs';


@Injectable({
  providedIn: 'root',

})
export class WeatherService implements OnInit{
  private WEATHERURL = `https://api.open-meteo.com/v1/forecast?latitude=<LAT>&longitude=<LONG>&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&hourly=temperature_2m,weathercode&timezone=auto`;
  private PLACEURL = "https://nominatim.openstreetmap.org/search?q=<PLACE>,%20India&format=json"
  private httpClient = inject(HttpClient);
  data = signal({});


  constructor() {

  }

  ngOnInit() {
  }



  getWeatherData(place: string){
    this.httpClient.get<any[]>(this.PLACEURL.replace("<PLACE>", place)).pipe(
      switchMap((locationData)=> {
        console.log(locationData);
        if(locationData && locationData.length > 0){
          const lat: string = locationData[0].lat;
          const lon: string = locationData[0].lon;
          return this.httpClient.get(this.WEATHERURL.replace("<LAT>",lat).replace("<LONG>",lon))

        }
        else {
          return of(null);
        }
      })
    ).subscribe({
      next:(res)=> {
      console.log(res);
      if(res)
      this.data.set(res);
      },
      error: (err)=> {
        console.log(err);
      }
    })
  }
}
