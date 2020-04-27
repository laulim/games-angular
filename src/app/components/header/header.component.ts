import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit, OnChanges {
  @Input() gamesInfo: any;
  gamesLength: number = this.gamesInfo ? this.gamesInfo.games.lenght : 0;
  merchantsLength: number = this.gamesInfo ? this.gamesInfo.merchants.lengh : 0;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    const { gamesInfo } = changes;
    if (gamesInfo.currentValue) {
      const { games, merchants } = gamesInfo.currentValue;
      this.gamesLength = Object.keys(games).length;
      this.merchantsLength = Object.keys(merchants).length;
    }
  }
}
