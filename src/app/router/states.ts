import { Transition } from '@uirouter/core';
import { HomePageComponent } from '../pages/home-page/home-page.component';
import { CategoryComponent } from '../pages/category/category.component';
import { FavouritesComponent } from '../pages/favourites/favourites.component';
import { GamesService } from '../services/games.service';

export const homeState = {
  name: 'home',
  url: '/',
  component: HomePageComponent,
  resolve: [
    {
      token: 'data',
      deps: [GamesService],
      resolveFn: (gamesService: GamesService) => {
        return gamesService.getAllInfo();
      },
    },
  ],
};

export const categoryState = {
  name: 'category',
  url: '/:slug',
  component: CategoryComponent,
  resolve: [
    {
      token: 'data',
      deps: [Transition, GamesService],
      resolveFn: (trans: Transition, gamesService: GamesService) => {
        return gamesService.getInfoFiltered(trans.params().slug);
      },
    },
  ],
};

export const favouritesState = {
  name: 'favourite',
  url: '/favourite/',
  component: FavouritesComponent,
  resolve: [
    {
      token: 'data',
      deps: [GamesService],
      resolveFn: (gamesService: GamesService) => {
        return gamesService.getInfoFavourites();
      },
    },
  ],
};
