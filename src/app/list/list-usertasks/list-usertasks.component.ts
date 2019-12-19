import { Component, OnInit } from '@angular/core';
import { UserTaskService } from 'src/app/services/usertask.service';
import { UserTask } from 'src/app/model/usertask.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-usertasks',
  templateUrl: './list-usertasks.component.html',
  styleUrls: ['./list-usertasks.component.scss']
})
export class ListUserTasksComponent implements OnInit {
  public userTasks: UserTask[];
  userId: any;
  config: any;
  public labels: any = {
    previousLabel: 'Previous',
    nextLabel: 'Next',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`
  };

  constructor(public taskService: UserTaskService,
    public route: ActivatedRoute) { }

  ngOnInit() {

    this.userId = this.route.snapshot.params.id;

    if (this.userId !== undefined) {
      this.listTasksById(this.userId);
    }
    else {
      this.listTasks();
    }
  }

  listTasks() {
    this.userTasks = [];
    this.taskService.getTasks().subscribe(data => {
      if (data.content.length > 0) {
        this.userTasks = data.content;

        this.config = {
          itemsPerPage: 10,
          currentPage: data.pageable.pageNumber,
          totalItems: data.totalElements
        };
      }
    })
  }

  listTasksById(id) {
    this.taskService.getTasksByUser(id).subscribe(data => {
      if (data.content.length > 0) {
        this.userTasks = data.content;

        this.config = {
          itemsPerPage: 10,
          currentPage: data.pageable.pageNumber,
          totalItems: data.totalElements
        };
      }
    })
  }

  removeTask(id) {
    this.taskService.removeTask(id).subscribe((data) => {
      this.listTasks();
    });
  }
}
