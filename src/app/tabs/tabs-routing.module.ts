import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'discover',
        loadChildren: () =>
          import('../discover/discover.module').then(
            (m) => m.DiscoverPageModule
          ),
      },
      {
        path: 'search',
        loadChildren: () =>
          import('../search/search.module').then((m) => m.SearchPageModule),
      },
      {
        path: 'trending',
        loadChildren: () =>
          import('../trending/trending.module').then(
            (m) => m.TrendingPageModule
          ),
      },
      {
        path: '',
        redirectTo: '/discover',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/discover',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
