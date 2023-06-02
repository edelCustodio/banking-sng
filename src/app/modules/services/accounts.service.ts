import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAccount } from '@models/account';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  private accountsUrl = 'api/accounts';

  constructor(
    private http: HttpClient,
  ) { }

  getAccounts(): Observable<IAccount[]> {
    return this.http.get<IAccount[]>(this.accountsUrl);
  }
}
