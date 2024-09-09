import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GolfCourseService } from 'src/app/core/services/golf-course/golf-course.service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { GolfCourseCreationRequest } from 'src/app/core/models/golf-course/golf-course-create.request';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-create-golf-course',
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
  templateUrl: './create-golf-course.component.html',
  styleUrls: ['./create-golf-course.component.scss']
})
export class CreateGolfCourseComponent {

  createGolfCourseForm!: FormGroup;

  subscriptions!: Subscription;

  constructor(
    private golfCourseService: GolfCourseService,
    private formBuilder: FormBuilder,
    private router: Router,
    private cdrf: ChangeDetectorRef,
    private ngZone: NgZone,
  ) { }

  ngOnInit() {
    this.createGolfCourseForm = this.createGolfCourseMaintenanceForm();
  }

  ngAfterViewChecked() {
    this.cdrf.detectChanges();
  }

  ngOnDestroy() {
    this.subscriptions?.unsubscribe();
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

  createGolfCourse() {
    const createGolfCourseRequest: GolfCourseCreationRequest = {
      name: this.createGolfCourseForm.get('name')?.value,
      city: this.createGolfCourseForm.get('city')?.value,
      subdivision: this.createGolfCourseForm.get('subdivision')?.value,
      country: this.createGolfCourseForm.get('country')?.value,
      slopeRating: this.createGolfCourseForm.get('slopeRating')?.value,
      courseRating: this.createGolfCourseForm.get('courseRating')?.value,
      yardage: this.createGolfCourseForm.get('yardage')?.value,
      par: this.createGolfCourseForm.get('par')?.value,
    };
    this.subscriptions = this.golfCourseService.createGolfCourse(createGolfCourseRequest).subscribe({
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
    if (this.createGolfCourseForm.controls[formControlName].invalid && (this.createGolfCourseForm.controls[formControlName].dirty || this.createGolfCourseForm.controls[formControlName].touched)) {
      return true;
    }
    return false;
  }

  save() {
    this.createGolfCourse();
  }

  clearForm() {
    this.createGolfCourseForm.reset();
  }

  back() {
    this.ngZone.run(() => {
      this.router.navigate(['/golfCourses']);
    });
  }
}
