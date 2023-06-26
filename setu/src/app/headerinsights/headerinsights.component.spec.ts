import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderinsightsComponent } from './headerinsights.component';

describe('HeaderinsightsComponent', () => {
  let component: HeaderinsightsComponent;
  let fixture: ComponentFixture<HeaderinsightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderinsightsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderinsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
