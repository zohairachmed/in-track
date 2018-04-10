import { TestBed, inject } from '@angular/core/testing';

import { DataIntakeService } from './data-intake.service';

describe('DataIntakeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataIntakeService]
    });
  });

  it('should be created', inject([DataIntakeService], (service: DataIntakeService) => {
    expect(service).toBeTruthy();
  }));
});
