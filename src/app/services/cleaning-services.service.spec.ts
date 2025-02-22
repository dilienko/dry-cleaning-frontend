import { TestBed } from '@angular/core/testing';

import { CleaningServicesService } from './cleaning-services.service';

describe('CleaningServicesService', () => {
  let service: CleaningServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CleaningServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
