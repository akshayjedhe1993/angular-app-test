import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/modals/user.modal';
import { HttpService } from 'src/app/services/http.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-assessment2',
  templateUrl: './assessment2.component.html',
  styleUrls: ['./assessment2.component.scss']
})
export class Assessment2Component implements OnInit {
  responseData!: User[];

  loading: boolean = false;
  errorMessage: string = '';

  userDetailsForm!: FormGroup;
  dataSource: any;

  validationMessages = {
    name: [
      { type: 'required', message: 'Username is required' },
      {
        type: 'minlength',
        message: 'Username must be at least 5 characters long',
      },
      {
        type: 'maxlength',
        message: 'Username cannot be more than 25 characters long',
      },
      {
        type: 'pattern',
        message: 'Your username must contain only numbers and letters',
      },
    ],
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid mail' },
    ],
  };

  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'description'];

  constructor(private httpService: HttpService, private fb: FormBuilder) { }

  ngOnInit() {
    this.createForms();
  }

  createForms() {
    this.userDetailsForm = this.fb.group({
      name: new FormControl(
        '',
        Validators.compose([
          Validators.maxLength(25),
          Validators.minLength(5),
          // Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z]+$'),
          Validators.required,
        ])
      ),

      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
    });
  }

  onSubmitDetails(requestData: User) {
    this.responseData = [];
    this.loading = true;
    this.errorMessage = "";
    this.httpService.getUsers(requestData)
      .subscribe(
        (response) => {                           //next() callback
          console.log('response received')
          this.responseData = response;
          this.loading = false;
        },
        (error) => {                              //error() callback
          console.error('Request failed with error')
          this.errorMessage = JSON.stringify(error);
          this.loading = false;
        },
        () => {                                   //complete() callback
          console.log('Request completed')
          this.loading = false;
        }
      )
    this.dataSource = new MatTableDataSource(this.responseData);
  }

}
