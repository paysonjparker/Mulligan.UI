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
import { AddUser } from 'src/app/core/models/user/add-user.request';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-maintenance',
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
  templateUrl: './user-maintenance.component.html',
  styleUrls: ['./user-maintenance.component.scss']
})
export class UserMaintenanceComponent implements OnInit, AfterViewChecked, OnDestroy {

  userMaintenanceForm!: FormGroup;

  golfCourses: GolfCourse[] = [];

  subscriptions!: Subscription;

  isEdit = false;

  userId: string;

  constructor(private userService: UserService,
    private golfCourseService: GolfCourseService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private cdrf: ChangeDetectorRef,
    private ngZone: NgZone,
  ) {
    this.userId = this.route?.parent?.snapshot.params['Id'];
    if (this.userId) {
      this.isEdit = true;
    }
  }

  ngOnInit() {
    this.userMaintenanceForm = this.createUserMaintenanceForm();
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
    this.subscriptions = this.golfCourseService.getGolfCourses().subscribe({
      next: (data) => {
        this.golfCourses = data;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  createUser() {
    const createUserRequest: AddUser = {
      username: this.userMaintenanceForm.get('username')?.value,
      name: this.userMaintenanceForm.get('name')?.value,
      email: this.userMaintenanceForm.get('email')?.value,
      password: this.userMaintenanceForm.get('password')?.value,
      golfCourseId: this.userMaintenanceForm.get('golfCourseId')?.value,
    };
    this.subscriptions = this.userService.addUser(createUserRequest).subscribe({
      next: data => {
        console.info(data);
      },
      error: (error) => {
        console.error(error);
      },
    });
    this.router.navigate(['/users']);
  }

  updateUser() {

  }

  validateRequiredFields(formControlName: any) {
    if (this.userMaintenanceForm.controls[formControlName].invalid && (this.userMaintenanceForm.controls[formControlName].dirty || this.userMaintenanceForm.controls[formControlName].touched)) {
      return true;
    }
    return false;
  }

  save() {
    if (this.isEdit) {
      this.updateUser();
    } else {
      this.createUser();
    }
  }

  clearForm() {
    this.userMaintenanceForm.reset();
  }

  back() {
    this.ngZone.run(() => {
      this.router.navigate(['/users']);
    });
  }
}
