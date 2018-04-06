import { TestBed, inject } from '@angular/core/testing';

import { ControlbutService } from './controlbut.service';

describe('ControlbutService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ControlbutService]
    });
  });

  it('should be created', inject([ControlbutService], (service: ControlbutService) => {
    expect(service).toBeTruthy();
  }));
});
