import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostMaintenanceComponent } from './post-maintenance.component';

describe('PostMaintenanceComponent', () => {
  let component: PostMaintenanceComponent;
  let fixture: ComponentFixture<PostMaintenanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PostMaintenanceComponent]
    });
    fixture = TestBed.createComponent(PostMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
