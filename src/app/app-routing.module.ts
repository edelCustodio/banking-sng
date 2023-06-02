import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './core/layout/main/main.component';
import { appResolver } from '@resolvers/app.resolver';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    resolve: {
      userloggedIn: appResolver
    },
    children: [
      {
        path: 'transactions',
        loadChildren: () =>
          import('./modules/transactions/transactions.module').then(m => m.TransactionsModule)
      },
      { path: '', redirectTo: 'transactions', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
