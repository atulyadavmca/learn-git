import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapfInsightsComponent } from './capf-insights.component';

describe('CapfInsightsComponent', () => {
  let component: CapfInsightsComponent;
  let fixture: ComponentFixture<CapfInsightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapfInsightsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapfInsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
