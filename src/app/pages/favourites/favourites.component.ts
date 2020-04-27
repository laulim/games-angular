import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.sass'],
})
export class FavouritesComponent implements OnInit {
  @Input() data: any;
  gamesTotal: number;

  changeGamesTotal = (total: number) => {
    this.gamesTotal = total;
  };

  ngOnInit(): void {
    this.gamesTotal = this.data.games.length;
  }
}
