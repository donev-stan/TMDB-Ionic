import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'discover',
  },

  // Find
  {
    path: 'discover',
    loadChildren: () =>
      import('./discover/discover.module').then((m) => m.DiscoverPageModule),
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./search/search.module').then((m) => m.SearchPageModule),
  },

  // View
  {
    path: 'trending',
    loadChildren: () =>
      import('./trending/trending.module').then((m) => m.TrendingPageModule),
  },
  {
    path: 'top-rated',
    loadChildren: () =>
      import('./top-rated/top-rated.module').then((m) => m.TopRatedPageModule),
  },
  {
    path: 'popular',
    loadChildren: () =>
      import('./popular/popular.module').then((m) => m.PopularPageModule),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
