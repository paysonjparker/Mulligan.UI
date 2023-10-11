import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGolfCourseComponent } from './create-golf-course.component';

describe('CreateGolfCourseComponent', () => {
  let component: CreateGolfCourseComponent;
  let fixture: ComponentFixture<CreateGolfCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateGolfCourseComponent]
    });
    fixture = TestBed.createComponent(CreateGolfCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
