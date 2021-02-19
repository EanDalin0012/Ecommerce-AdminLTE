import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public addEmployeeForm: FormGroup;
  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.addEmployeeForm = this.formBuilder.group({
      client: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    this.toastr.success("Bank & statutory added", "Success");
  }

}
