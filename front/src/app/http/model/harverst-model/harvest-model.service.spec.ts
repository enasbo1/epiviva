import { TestBed } from '@angular/core/testing';

import { HarvestModelService } from './harvest-model.service';

describe('HarvestModelService', () => {
  let service: HarvestModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HarvestModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
