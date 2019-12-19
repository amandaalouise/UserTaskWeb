import { Component, OnInit } from '@angular/core';
import { UserTask } from 'src/app/model/usertask.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserTaskService } from 'src/app/services/usertask.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-form-task',
  templateUrl: './form-task.component.html',
  styleUrls: ['./form-task.component.scss']
})
export class FormTaskComponent implements OnInit {

  usertask: UserTask = new UserTask();
  users: User[];
  taskId: any;

  taskForm: FormGroup;

  constructor(
    public taskService: UserTaskService,
    public router: Router,
    public route: ActivatedRoute,
    public userService: UserService,
    private formBuilder: FormBuilder,
  ) { 
    this.taskForm = this.createFormGroupWithBuilder(this.formBuilder);
  }

  ngOnInit() {
    this.getUsers();

    this.taskId = this.route.snapshot.params.id;

    if(this.taskId !== undefined) {
      this.getTaskById(this.taskId);
    }
 }

  createFormGroupWithBuilder(formBuilder: FormBuilder) {
    return formBuilder.group({
      description: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      userId: new FormControl('', Validators.required),
    });
  }

  getUsers() {
    this.userService.getUsersNoPage().subscribe(data => {
      
      this.users = [];
      this.users  = data;
    })
  }  

  onSubmit() {
    this.usertask.description = this.taskForm.value.description;
    this.usertask.state = this.taskForm.value.state;
    this.usertask.userId = this.taskForm.value.userId;
    this.registerUserTask();
  }

  getTaskById(id) {
    this.taskService.getTaskById(id).then(task => {
      this.usertask = task;

      this.taskForm.controls.description.setValue(this.usertask.description);
      this.taskForm.controls.state.setValue(this.usertask.state);
      this.taskForm.controls.userId.setValue(this.usertask.userId);
    })
  }

  registerUserTask() {
    this.taskService.registerTask(JSON.stringify(this.usertask)).subscribe(data => {
      if(data.ok) {
        this.router.navigate(['/list-tasks']);
      }
    });
  }
}
