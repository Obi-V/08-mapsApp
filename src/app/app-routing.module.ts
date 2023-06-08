import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule)
},
{
  path: 'alone',
  loadComponent: () => import('./alone/pages/alone/alone.component').then(m => m.AloneComponent)
},
{
  path: '**',
  redirectTo: 'maps'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
