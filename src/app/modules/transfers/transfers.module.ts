import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransfersComponent } from './transfers.component';
import { Route, RouterModule } from '@angular/router';
import { MaterialModule } from '@shared/material.module';

const routes: Route[] = [
  {
    path: '',
    component: TransfersComponent
  }
]

@NgModule({
  declarations: [
    TransfersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule
  ]
})
export class TransfersModule { }
