import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GolfCourseDetailsComponent } from './golf-course-details.component';

describe('GolfCourseDetailsComponent', () => {
  let component: GolfCourseDetailsComponent;
  let fixture: ComponentFixture<GolfCourseDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GolfCourseDetailsComponent]
    });
    fixture = TestBed.createComponent(GolfCourseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
