import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UIRouterModule } from '@uirouter/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AppComponent } from './app.component';
import { ListComponent } from './components/list/list.component';
import { CardComponent } from './components/card/card.component';
import { HeaderComponent } from './components/header/header.component';
import { FiltersComponent } from './components/navi/navi.component';
import { PagiantorComponent } from './components/pagiantor/pagiantor.component';
import { SearchComponent } from './components/search/search.component';
import { SortComponent } from './components/sort/sort.component';
import { MerchantsComponent } from './components/merchants/merchants.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CategoryComponent } from './pages/category/category.component';
import { FavouritesComponent } from './pages/favourites/favourites.component';

import { GamesService } from './services/games.service';
import { uiRouterConfigFn } from './router/router.config';
import { homeState, categoryState, favouritesState } from './router/states';

const INITIAL_STATES = [homeState, categoryState, favouritesState];

const routes = [
  { name: 'home', url: '/', component: HomePageComponent },
  { name: 'category', url: '/category', component: CategoryComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CardComponent,
    HeaderComponent,
    FiltersComponent,
    PagiantorComponent,
    SearchComponent,
    SortComponent,
    HomePageComponent,
    CategoryComponent,
    MerchantsComponent,
    FavouritesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // UIRouterModule.forRoot({ states: routes, useHash: false }),
    UIRouterModule.forRoot({
      states: INITIAL_STATES,
      useHash: false,
      config: uiRouterConfigFn,
    }),
    BrowserAnimationsModule,
    FormsModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  providers: [{ provide: GamesService, useClass: GamesService }],
  bootstrap: [AppComponent],
})
export class AppModule {}
