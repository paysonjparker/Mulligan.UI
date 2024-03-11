import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GolfCourseListComponent } from './golf-course-list.component';

describe('GolfCourseListComponent', () => {
  let component: GolfCourseListComponent;
  let fixture: ComponentFixture<GolfCourseListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GolfCourseListComponent]
    });
    fixture = TestBed.createComponent(GolfCourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
