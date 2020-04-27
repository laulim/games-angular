import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.sass'],
})
export class SortComponent {
  @Input() sort: string;

  @Output() sortChangeed: EventEmitter<string> = new EventEmitter<string>();

  handlerChange(event: MatButtonToggleChange) {
    this.sortChangeed.emit(event.value);
  }
}
