import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'trending',
        loadChildren: () =>
          import('./trending/trending.module').then(
            (m) => m.TrendingPageModule
          ),
      },
      {
        path: 'top-rated',
        loadChildren: () =>
          import('./top-rated/top-rated.module').then(
            (m) => m.TopRatedPageModule
          ),
      },
      {
        path: 'popular',
        loadChildren: () =>
          import('./popular/popular.module').then((m) => m.PopularPageModule),
      },
      {
        path: '',
        redirectTo: '/tabs/trending',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/trending',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
