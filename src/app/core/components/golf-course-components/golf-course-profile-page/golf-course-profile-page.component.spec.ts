import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GolfCourseProfilePageComponent } from './golf-course-profile-page.component';

describe('GolfCourseProfilePageComponent', () => {
  let component: GolfCourseProfilePageComponent;
  let fixture: ComponentFixture<GolfCourseProfilePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GolfCourseProfilePageComponent]
    });
    fixture = TestBed.createComponent(GolfCourseProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
