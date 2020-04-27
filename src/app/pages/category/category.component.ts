import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.sass'],
})
export class CategoryComponent implements OnInit {
  @Input() data: any;
  gamesTotal: number;

  changeGamesTotal = (total: number) => {
    this.gamesTotal = total;
  };

  ngOnInit(): void {
    this.gamesTotal = this.data.games.length;
  }
}
