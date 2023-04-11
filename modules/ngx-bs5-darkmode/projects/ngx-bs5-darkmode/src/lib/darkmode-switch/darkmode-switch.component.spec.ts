import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DarkmodeSwitchComponent } from './darkmode-switch.component';

describe('DarkmodeSwitchComponent', () => {
  let component: DarkmodeSwitchComponent;
  let fixture: ComponentFixture<DarkmodeSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DarkmodeSwitchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DarkmodeSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
