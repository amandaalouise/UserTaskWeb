import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Global } from '../utils/global';
import { Page } from '../model/page.model';
import { UserTask } from '../model/usertask.model';

@Injectable({
  providedIn: 'root'
})
export class UserTaskService {
  
  constructor(private httpClient : HttpClient) { }

  public registerTask(formData) {
    return this.httpClient.post(Global.taskUrl, formData,
    {observe : 'response', headers: {'Content-Type': 'application/json'}}).pipe(map(data => data));
  }

  public getTasks(page: any = 0, size: any = 12) {
    return this.httpClient.get(Global.taskUrl + "?page=" + page + "&size=" +size, {
    }).pipe(map((page: Page) => page));
  }

  public getTaskById(id: number) {
    return this.httpClient.get(Global.taskUrl + "/" + id, {
    }).pipe(map((Task: UserTask) => Task)).toPromise();
  }

  public getTasksByUser(id: number, page: any = 0, size: any = 12) {
    return this.httpClient.get(Global.taskUrl + "/byUserId/" + id + "?page=" + page + "&size=" +size, {
    }).pipe(map((page: Page) => page));
  }

  public updateTask(formData) {
    return this.httpClient.post(Global.taskUrl + "/update", formData,
    {observe : 'response'}).pipe(map(data => data));
  }

  public removeTask(id: number) {
    let url = Global.taskUrl + "/" +id;

    console.log(url);
    return this.httpClient.delete(url);
  }
}
