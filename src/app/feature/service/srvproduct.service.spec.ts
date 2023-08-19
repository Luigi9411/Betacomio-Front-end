import { TestBed } from '@angular/core/testing';

import { SrvproductService } from './srvproduct.service';

describe('FeatureservicesrvproductService', () => {
  let service: SrvproductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SrvproductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
