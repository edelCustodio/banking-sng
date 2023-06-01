import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsComponent } from './transactions.component';
import { Route, RouterModule } from '@angular/router';
import { MaterialModule } from '@shared/material.module';

const routes: Route[] = [
  {
    path: '',
    component: TransactionsComponent
  }
]

@NgModule({
  declarations: [
    TransactionsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule
  ]
})
export class TransactionsModule { }
