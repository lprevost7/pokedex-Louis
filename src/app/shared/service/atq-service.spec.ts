import { TestBed } from '@angular/core/testing';
import { AtqService } from './atq-service';

describe('AtqService', () => {
  let service: AtqService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
