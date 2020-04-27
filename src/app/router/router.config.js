import { UIRouter } from '@uirouter/core';
import { visualizer } from '@uirouter/visualizer';
import { Injector, Injectable } from '@angular/core';
import { GamesService } from '../services/games.service';

/** UIRouter Config Function  */
export function uiRouterConfigFn(router, injector) {
  // Configure the initial state
  // If the browser URL doesn't matches any state when the router starts,
  // go to the `hello` state by default
  router.urlService.rules.initial({ state: 'home' });

  // Use @uirouter/visualizer to show the states and transitions
  visualizer(router);
}
