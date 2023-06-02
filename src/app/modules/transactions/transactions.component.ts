import { Component, OnDestroy, OnInit } from '@angular/core';
import { TransactionsService } from '../services/transactions.service';
import { ITransaction } from '@models/transaction';
import { Subject, forkJoin, takeUntil } from 'rxjs';
import { UsersService } from '@modules/services/users.service';
import { MerchantsService } from '@modules/services/merchants.service';
import { AccountsService } from '@modules/services/accounts.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit, OnDestroy {

  transactions!: ITransaction[];
  unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private transactionsService: TransactionsService,
    private usersService: UsersService,
    private merchantsService: MerchantsService,
    private accountsService: AccountsService
  ) {}

  ngOnInit(): void {
    const merchants$ = this.merchantsService.getMerchantsWithType();
    const transactions$ = this.transactionsService.getTransactions();
    const account$ = this.accountsService.getAccountById();
    const userLoggedIn$ = this.usersService.userLoggedIn$;

    forkJoin([
      transactions$,
      merchants$,
      account$,
      userLoggedIn$
    ]).pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe(
      ([transactions, merchants, account, userloggedIn]) => this.transactions = transactions.map(
        (transaction: ITransaction) => ({
          ...transaction,
          userName: userloggedIn.user.firstName,
          merchantName: merchants.find(m => m.id === transaction.merchantId)?.name,
          merchantType: merchants.find(m => m.id === transaction.merchantId)?.merchantName,
          accountNumber: account.accountNumber
        } as ITransaction)
      )
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
