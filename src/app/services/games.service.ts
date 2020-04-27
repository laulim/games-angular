import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getStorageData } from '../utils/utils';

export interface Merchants {
  [key: number]: Merchant;
}
export interface Merchant {
  Alias: string;
  ID: string;
  Image: string;
  Name: string;
  menuId: string;
}
export interface Game {
  AR: string;
  Branded: any;
  CategoryID: string[];
  Description: any[];
  ExternalCode: string;
  ID: string;
  IDCountryRestriction: string;
  Image: string;
  ImageFullPath: string;
  LaunchCode: string;
  MerchantID: string;
  MobileAndroidPageCode: any;
  MobileExternalCode: string;
  MobilePageCode: string;
  MobileUrl: string;
  MobileWindowsPageCode: any;
  Name: CatName;
  PageCode: string;
  Sort: string;
  SortPerCategory: any;
  SuperBranded: any;
  Url: string;
  WorkingHours: any;
  hasDemo: number;
  isRestricted: boolean;
}
export interface CatName {
  cn: string;
  de: string;
  en: string;
  ja: string;
  ko: string;
  ru: string;
  sv: string;
  uk: string;
  zh: string;
  'zh-cn': string;
  'zh-hans': string;
}
export interface Category {
  CSort: string;
  CSubSort: string;
  ID: string;
  Name: CatName;
  Slug: string;
  Tags: string[];
  Trans: CatName;
  menuId: string;
}
export interface GamesInfo {
  categories: Category[];
  countriesRestrictions: any;
  games: Game[];
  merchants: Merchants;
  merchantsCurrencies: any;
}

@Injectable()
export class GamesService {
  rootUrl = 'http://localhost:4200/proxy?lang=en';

  constructor(@Inject(HttpClient) public http: HttpClient) {
    console.log('GamesService');
  }

  getAllInfo = (): Promise<GamesInfo> => {
    return this.http.get<GamesInfo>(this.rootUrl).toPromise();
  };

  getInfoFiltered = (catSlug: string): Promise<any> => {
    return this.getAllInfo().then((gamesInfo: GamesInfo) => {
      const catId = gamesInfo.categories.find((el) => el.menuId === catSlug).ID;
      return {
        ...gamesInfo,
        games: gamesInfo.games.filter((el) =>
          el.CategoryID.some((id) => id === catId)
        ),
      };
    });
  };

  getInfoFavourites = (): Promise<any> => {
    const favourites = getStorageData('favouritesData');
    return this.getAllInfo().then((gamesInfo: GamesInfo) => {
      return {
        ...gamesInfo,
        games: gamesInfo.games.filter((el: Game) => favourites.includes(el.ID)),
      };
    });
  };
}
