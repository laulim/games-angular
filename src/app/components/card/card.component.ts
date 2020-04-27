import {
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Game } from '../../services/games.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass'],
})
export class CardComponent implements OnInit, OnChanges {
  @Input() game: Game;
  @Input() favourites: string;
  @Input() priorityList: string;
  isFavourites = false;
  isPriority = false;

  @Output() toggleFavourites = new EventEmitter<string>();
  @Output() toggleToPriorityList = new EventEmitter<string>();

  toggleTofavourites() {
    this.isFavourites = !this.isFavourites;
    this.toggleFavourites.emit(this.game.ID);
  }

  toggleToPriority() {
    this.isPriority = !this.isPriority;
    this.toggleToPriorityList.emit(this.game.ID);
  }

  ngOnInit(): void {
    this.isFavourites = this.favourites.includes(this.game.ID);
    this.isPriority = this.priorityList.includes(this.game.ID);
  }

  ngOnChanges(changes: SimpleChanges): void {}
}
