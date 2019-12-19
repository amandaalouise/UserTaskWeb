import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  public users: User[];
  config: any;
  public labels: any = {
    previousLabel: 'Previous',
    nextLabel: 'Next',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`
  };

  constructor(public userService: UserService) { }

  ngOnInit() {
    this.listUsers();
  }

  listUsers() {
    this.users = [];

    this.userService.getUsers().subscribe(data => {

      if (data.content.length > 0) {
        this.users = data.content;

        this.config = {
          itemsPerPage: 10,
          currentPage: data.pageable.pageNumber,
          totalItems: data.totalElements
        };
      }
    })
  }

  removeUser(id) {
    this.userService.removeUser(id).subscribe((data) => {
      this.listUsers();
    });
  }
}
