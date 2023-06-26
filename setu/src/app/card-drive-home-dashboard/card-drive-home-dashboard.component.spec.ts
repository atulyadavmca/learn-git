import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDriveHomeDashboardComponent } from './card-drive-home-dashboard.component';

describe('CardDriveHomeDashboardComponent', () => {
  let component: CardDriveHomeDashboardComponent;
  let fixture: ComponentFixture<CardDriveHomeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardDriveHomeDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDriveHomeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
