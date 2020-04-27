import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../services/games.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.sass'],
})
export class FiltersComponent implements OnInit {
  @Input() info: any;
  categories: Category[];

  ngOnInit(): void {
    this.categories = this.info.categories;
  }
}
