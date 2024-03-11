import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreMaintenanceComponent } from './score-maintenance.component';

describe('ScoreMaintenanceComponent', () => {
  let component: ScoreMaintenanceComponent;
  let fixture: ComponentFixture<ScoreMaintenanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ScoreMaintenanceComponent]
    });
    fixture = TestBed.createComponent(ScoreMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
