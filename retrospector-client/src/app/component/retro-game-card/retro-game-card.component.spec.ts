import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetroGameCardComponent } from './retro-game-card.component';

describe('RetroGameCardComponent', () => {
  let component: RetroGameCardComponent;
  let fixture: ComponentFixture<RetroGameCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetroGameCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetroGameCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});