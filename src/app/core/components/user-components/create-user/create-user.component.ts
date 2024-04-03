import { AfterViewChecked, ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GolfCourse } from 'src/app/core/models/golf-course/golf-course.model';
import { UserService } from 'src/app/core/services/user/user.service';
import { GolfCourseService } from 'src/app/core/services/golf-course/golf-course.service';
import { Subscription } from 'rxjs';
import { UserCreationRequest } from 'src/app/core/models/user/user-creation.request';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
  ],
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit, AfterViewChecked, OnDestroy {

  createUserForm!: FormGroup;

  golfCourses: GolfCourse[] = [];

  subscriptions!: Subscription;

  constructor(private userService: UserService,
    private golfCourseService: GolfCourseService,
    private formBuilder: FormBuilder,
    private router: Router,
    private cdrf: ChangeDetectorRef,
    private ngZone: NgZone,
  ) { }

  ngOnInit() {
    this.createUserForm = this.createUserMaintenanceForm();
    this.getGolfCourses();
  }

  ngAfterViewChecked() {
    this.cdrf.detectChanges();
  }

  ngOnDestroy() {
    this.subscriptions?.unsubscribe();
  }

  public createUserMaintenanceForm(): FormGroup {
    return this.formBuilder.group({
      username: new FormControl<string>('', { validators: [Validators.required] }),
      name: new FormControl<string>('', { validators: [Validators.required] }),
      email: new FormControl<string>('', { validators: [Validators.required, Validators.email] }),
      password: new FormControl<string>('', { validators: [Validators.required] }),
      golfCourseId: new FormControl<string>('', { validators: [Validators.required] }),
    });
  }

  public getGolfCourses() {
    this.subscriptions = this.golfCourseService.getAllGolfCourses().subscribe({
      next: (data) => {
        this.golfCourses = data;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  createUser() {
    const createUserRequest: UserCreationRequest = {
      username: this.createUserForm.get('username')?.value,
      name: this.createUserForm.get('name')?.value,
      email: this.createUserForm.get('email')?.value,
      password: this.createUserForm.get('password')?.value,
      golfCourseId: this.createUserForm.get('golfCourseId')?.value,
    };
    this.subscriptions = this.userService.createUser(createUserRequest).subscribe({
      next: data => {
        console.info(data);
      },
      error: (error) => {
        console.error(error);
      },
    });
    this.back()
  }

  validateRequiredFields(formControlName: any) {
    if (this.createUserForm.controls[formControlName].invalid && (this.createUserForm.controls[formControlName].dirty || this.createUserForm.controls[formControlName].touched)) {
      return true;
    }
    return false;
  }

  save() {
    this.createUser();
  }

  clearForm() {
    this.createUserForm.reset();
  }

  back() {
    this.ngZone.run(() => {
      this.router.navigate(['/users']);
    });
  }
}
