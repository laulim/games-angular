import {
  Component,
  OnInit,
  OnChanges,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  trigger,
  query,
  style,
  animate,
  transition,
  stagger,
} from '@angular/animations';
import { PageEvent } from '@angular/material/paginator';
import { Game, Merchant, GamesInfo } from '../../services/games.service';
import { setStorageData, getStorageData } from '../../utils/utils';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass'],
  animations: [
    trigger('gamesAnimation', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0 }),
            stagger(30, [animate('500ms ease-out', style({ opacity: 1 }))]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class ListComponent implements OnInit, OnChanges {
  @Input() data: GamesInfo;
  merchants: Merchant[];
  games: any;
  merchantsFilter: string[];
  gamesListFiltered: Game[];
  gamesListSorted: Game[];
  gamesListToShow: Game[];
  favourites: string[] = [];
  priorityList: string[] = [];
  sort = 'ASC';
  itemsPerPage = 8;
  currentPage = 0;
  pages: number;
  categoriesFilter = '';

  @Output() changeGamesTotal = new EventEmitter<number>();

  filterGames() {
    if (!this.merchantsFilter && !this.merchantsFilter) {
      this.gamesListFiltered = this.games;
      return;
    }
    this.gamesListFiltered = this.games.filter((item) => {
      const isMerchant = this.merchantsFilter.length
        ? this.merchantsFilter.some((elem) => elem === item.MerchantID)
        : true;
      const isCategory = this.categoriesFilter.length
        ? item.CategoryID.some((cat) => cat === this.categoriesFilter)
        : true;
      return isMerchant && isCategory;
    });
    this.changeGamesTotal.emit(this.gamesListFiltered.length);
  }

  sortGames() {
    const type = this.sort === 'ASC' ? 1 : -1;
    const isPriority = this.priorityList && this.priorityList.length;

    const mapped = this.gamesListFiltered.map((el, i) => {
      return {
        index: i,
        value: el.Name.en.toLowerCase(),
        priority: isPriority && this.priorityList.includes(el.ID),
      };
    });

    mapped.sort(
      (a: any, b: any): number => a.value.localeCompare(b.value) * type
    );

    if (isPriority)
      mapped.sort((a: any, b: any): number => (a.priority ? -1 : 0));

    this.gamesListSorted = mapped.map((el) => this.gamesListFiltered[el.index]);
  }

  divideGamesOnPages(): void {
    this.pages = Math.floor(this.gamesListSorted.length / this.itemsPerPage);
    const firstElem = this.currentPage * this.itemsPerPage;
    const lastElem = firstElem + this.itemsPerPage;
    this.gamesListToShow = this.gamesListSorted.slice(firstElem, lastElem);
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.itemsPerPage = event.pageSize;
    this.divideGamesOnPages();
  }

  onSortChange(sort: string): void {
    this.sort = sort;
    this.sortGames();
    this.divideGamesOnPages();
  }

  onMerchantsChange(merchants: string[]): void {
    this.merchantsFilter = merchants;
    this.filterGames();
    this.sortGames();
    this.divideGamesOnPages();
  }

  addToFavourites(id: string): void {
    if (this.favourites.includes(id)) {
      this.favourites.splice(this.favourites.indexOf(id), 1);
    } else {
      this.favourites.push(id);
    }
    setStorageData(this.favourites, 'favouritesData');
  }

  addToPriorityList(id: string): void {
    if (this.priorityList.includes(id)) {
      this.priorityList.splice(this.priorityList.indexOf(id), 1);
    } else {
      this.priorityList.push(id);
    }
    setStorageData(this.priorityList, 'priorityListData');
    this.sortGames();
    this.divideGamesOnPages();
  }

  ngOnInit(): void {
    this.games = this.data.games;
    this.merchants = Object.values(this.data.merchants);
    this.favourites = getStorageData('favouritesData');
    this.priorityList = getStorageData('priorityListData');
    this.filterGames();
    this.sortGames();
    this.divideGamesOnPages();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { data, merchantsFilter } = changes;
    this.games = data.currentValue.games;
    this.filterGames();
    this.sortGames();
    this.divideGamesOnPages();
  }
}
