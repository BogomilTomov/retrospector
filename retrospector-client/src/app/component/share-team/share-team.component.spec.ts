import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareTeamComponent } from './share-team.component';

describe('ShareTeamComponent', () => {
  let component: ShareTeamComponent;
  let fixture: ComponentFixture<ShareTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
