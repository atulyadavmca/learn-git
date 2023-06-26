import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildSelectorComponent } from './child-selector.component';

describe('ChildSelectorComponent', () => {
  let component: ChildSelectorComponent;
  let fixture: ComponentFixture<ChildSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
