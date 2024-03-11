import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMaintenanceComponent } from './user-maintenance.component';

describe('UserMaintenanceComponent', () => {
  let component: UserMaintenanceComponent;
  let fixture: ComponentFixture<UserMaintenanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserMaintenanceComponent]
    });
    fixture = TestBed.createComponent(UserMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
