import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GamesInfo } from './services/games.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  rootUrl = 'http://localhost:4200/proxy?lang=en';
  isLoaded = false;
  response: GamesInfo;

  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get(this.rootUrl).subscribe((response: GamesInfo) => {
      this.response = response;
      this.isLoaded = true;
    });
  }

  ngOnInit() {
    this.getData();
  }
}
