import { TestBed } from '@angular/core/testing';

import { RetroGamesService } from './retro-games.service';

describe('RetrogameService', () => {
  let service: RetroGamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetroGamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
