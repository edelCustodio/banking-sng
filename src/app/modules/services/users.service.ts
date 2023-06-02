import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser, IUserAccount } from '@models/user';
import { Observable, combineLatest, map, mergeMap, shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersUrl = 'api/users/1';
  private userAccountsUrl = 'api/userAccounts';

  constructor(
    private http: HttpClient,
  ) { }

  user$ = this.http.get<IUser>(this.usersUrl).pipe(tap(console.log),shareReplay<IUser>(1));

  userAccounts$ = this.user$.pipe(
    mergeMap((user: IUser) => this.http.get<IUserAccount[]>(`${this.userAccountsUrl}?userId=${user.id}`).pipe(tap(console.log),shareReplay<IUserAccount[]>(1)))
  );

  userLoggedIn$ = combineLatest([
    this.user$,
    this.userAccounts$
  ]).pipe(
    map(([user, userAccounts]) => ({ user, userAccounts })),
    shareReplay(1)
  )
}
