import { Component, Output, Input, EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pagiantor',
  templateUrl: './pagiantor.component.html',
  styleUrls: ['./pagiantor.component.sass'],
})
export class PagiantorComponent {
  @Input() itemsPerPage: number;
  @Input() currentPage: number;
  @Input() items: number;
  pageSizeOptions: number[] = [8, 12, 24, 36];

  @Output() pageChanged: EventEmitter<PageEvent> = new EventEmitter<
    PageEvent
  >();

  pagesChange(event: PageEvent): void {
    this.pageChanged.emit(event);
  }
}
