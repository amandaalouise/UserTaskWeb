import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit {

  user: User = new User();
  userId: any;

  userForm: FormGroup;

  constructor(
    public userService: UserService,
    public router: Router,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) { 
    this.userForm = this.createFormGroupWithBuilder(this.formBuilder);
  }

  ngOnInit() {
    this.userId = this.route.snapshot.params.id;

    if(this.userId !== undefined) {
      this.getUserById(this.userId);
    }
  }

  createFormGroupWithBuilder(formBuilder: FormBuilder) {
    return formBuilder.group({
      name: new FormControl('', Validators.required),
    });
  }

  getUserById(id) {
    this.userService.getUserById(id).then(user => {
      this.user = user;

      this.userForm.controls.name.setValue(this.user.name);
    })
  }

  onSubmit() {
    this.user.name = this.userForm.value.name;
    this.registerUser();
  }

  registerUser() {

    this.userService.registerUser(JSON.stringify(this.user)).subscribe(data => {
      if(data.ok) {
        this.router.navigate(['/list-users']);
      }
    });
  }
}
