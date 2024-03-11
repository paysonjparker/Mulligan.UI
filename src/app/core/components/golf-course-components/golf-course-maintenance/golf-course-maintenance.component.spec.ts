import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GolfCourseMaintenanceComponent } from './golf-course-maintenance.component';

describe('GolfCourseMaintenanceComponent', () => {
  let component: GolfCourseMaintenanceComponent;
  let fixture: ComponentFixture<GolfCourseMaintenanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GolfCourseMaintenanceComponent]
    });
    fixture = TestBed.createComponent(GolfCourseMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
