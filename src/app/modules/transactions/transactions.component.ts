import { Component, OnDestroy, OnInit } from '@angular/core';
import { TransactionsService } from '../services/transactions.service';
import { ITransaction } from '@models/transaction';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit, OnDestroy {

  transactions!: ITransaction[];
  unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private transactionsService: TransactionsService
  ) {}

  ngOnInit(): void {
    this.transactionsService.getTransactions()
    .pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe(
      (transactions: ITransaction[]) => this.transactions = transactions
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
