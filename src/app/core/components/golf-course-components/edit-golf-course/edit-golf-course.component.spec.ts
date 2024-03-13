import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGolfCourseComponent } from './edit-golf-course.component';

describe('EditGolfCourseComponent', () => {
  let component: EditGolfCourseComponent;
  let fixture: ComponentFixture<EditGolfCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EditGolfCourseComponent]
    });
    fixture = TestBed.createComponent(EditGolfCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
