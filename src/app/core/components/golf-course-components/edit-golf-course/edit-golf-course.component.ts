import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GolfCourseService } from 'src/app/core/services/golf-course/golf-course.service';
import { GolfCourse } from 'src/app/core/models/golf-course/golf-course.model';
import { GolfCourseUpdateRequest } from 'src/app/core/models/golf-course/golf-course-update.request';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-edit-golf-course',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    ButtonModule,
  ],
  templateUrl: './edit-golf-course.component.html',
  styleUrls: ['./edit-golf-course.component.scss']
})
export class EditGolfCourseComponent {

  editGolfCourseForm!: FormGroup;

  golfCourse!: GolfCourse;

  subscriptions!: Subscription;

  constructor(
    private golfCourseService: GolfCourseService,
    private formBuilder: FormBuilder,
    private router: Router,
    private cdrf: ChangeDetectorRef,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.editGolfCourseForm = this.createGolfCourseMaintenanceForm();
    this.getGolfCourseData();
  }

  ngAfterViewChecked() {
    this.cdrf.detectChanges();
  }

  ngOnDestroy() {
    this.subscriptions?.unsubscribe();
  }

  public getGolfCourseData() {
    this.subscriptions = this.golfCourseService.getGolfCourseById(this.activatedRoute.snapshot.paramMap.get("Id")!).subscribe({
      next: (data) => {
        this.golfCourse = data;
        // Add values to the form
        this.editGolfCourseForm = this.formBuilder.group({
          name: new FormControl<string>(this.golfCourse.name, { validators: [Validators.required] }),
          location: new FormControl<string>(this.golfCourse.city, { validators: [Validators.required] }),
          slopeRating: new FormControl<number | null>(this.golfCourse.slopeRating, { validators: [Validators.required] }),
          courseRating: new FormControl<number | null>(this.golfCourse.courseRating, { validators: [Validators.required] }),
          yardage: new FormControl<number | null>(this.golfCourse.yardage, { validators: [Validators.required] }),
          par: new FormControl<number | null>(this.golfCourse.par, { validators: [Validators.required] }),
        });
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  public createGolfCourseMaintenanceForm(): FormGroup {
    return this.formBuilder.group({
      name: new FormControl<string>('', { validators: [Validators.required] }),
      location: new FormControl<string>('', { validators: [Validators.required] }),
      slopeRating: new FormControl<number | null>(null, { validators: [Validators.required] }),
      courseRating: new FormControl<number | null>(null, { validators: [Validators.required] }),
      yardage: new FormControl<number | null>(null, { validators: [Validators.required] }),
      par: new FormControl<number | null>(null, { validators: [Validators.required] }),
    });
  }

  updateGolfCourse() {
    const updateGolfCourseRequest: GolfCourseUpdateRequest = {
      name: this.editGolfCourseForm.get('name')?.value,
      location: this.editGolfCourseForm.get('location')?.value,
      slopeRating: this.editGolfCourseForm.get('slopeRating')?.value,
      courseRating: this.editGolfCourseForm.get('courseRating')?.value,
      yardage: this.editGolfCourseForm.get('yardage')?.value,
      par: this.editGolfCourseForm.get('par')?.value,
    };
    this.subscriptions = this.golfCourseService.updateGolfCourse(this.golfCourse.id, updateGolfCourseRequest).subscribe({
      next: data => {
        console.info(data);
        this.back()
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  validateRequiredFields(formControlName: any) {
    if (this.editGolfCourseForm.controls[formControlName].invalid && (this.editGolfCourseForm.controls[formControlName].dirty || this.editGolfCourseForm.controls[formControlName].touched)) {
      return true;
    }
    return false;
  }

  save() {
    this.updateGolfCourse();
  }

  clearForm() {
    this.editGolfCourseForm.reset();
  }

  back() {
    this.ngZone.run(() => {
      this.router.navigate(['/golfCourses/', this.golfCourse.id]);
    });
  }
}
