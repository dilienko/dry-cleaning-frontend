import { TestBed } from '@angular/core/testing';

import { CurrentClientService } from './current-client.service';

describe('CurrentClientService', () => {
  let service: CurrentClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
