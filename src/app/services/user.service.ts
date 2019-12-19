import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Global } from '../utils/global';
import { Page } from '../model/page.model';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  public registerUser(formData) {
    console.log(formData);
    return this.httpClient.post(Global.userUrl, formData,
      { observe: 'response', headers: { 'Content-Type': 'application/json' } }).pipe(map(data => data));
  }

  public getUsers(page: any = 0, size: any = 12) {
    return this.httpClient.get(Global.userUrl + "?page=" + page + "&size=" + size, {
    }).pipe(map((page: Page) => page));
  }

  public getUsersNoPage() {
    return this.httpClient.get(Global.userUrl + "/nopage").pipe(map((user: User[]) => user));
  }

  public getUserById(id: number) {
    return this.httpClient.get(Global.userUrl + "/" + id, {
    }).pipe(map((User: User) => User)).toPromise();
  }

  public updateUser(formData) {
    return this.httpClient.post(Global.userUrl + "/update", formData,
      { observe: 'response' }).pipe(map(data => data));
  }

  public removeUser(id: number) {
    return this.httpClient.delete(Global.userUrl + "/delete/" + id, { observe: 'response' }).pipe(map(data => data));
  }
}
