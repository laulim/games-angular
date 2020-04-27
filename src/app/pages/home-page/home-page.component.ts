import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { GamesInfo } from '../../services/games.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass'],
})
export class HomePageComponent implements OnInit, OnChanges {
  @Input() data: GamesInfo;
  gamesTotal: number;
  searchValue: string;
  gamesData: GamesInfo;

  changeGamesTotal = (total: number) => {
    this.gamesTotal = total;
  };

  searchValueChange = (search: string) => {
    const newGames = this.data.games.filter((el) =>
      el.Name.en.toLowerCase().includes(search.trim().toLowerCase())
    );
    this.gamesData = { ...this.gamesData, games: newGames };
    this.gamesTotal = newGames.length;
  };

  ngOnInit(): void {
    this.gamesData = this.data;
    this.gamesTotal = this.data.games.length;
  }

  ngOnChanges(changes: SimpleChanges): void {}
}
