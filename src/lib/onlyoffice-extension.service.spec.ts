import { TestBed } from '@angular/core/testing';

import { OnlyofficeExtensionService } from './onlyoffice-extension.service';

describe('OnlyofficeExtensionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OnlyofficeExtensionService = TestBed.get(OnlyofficeExtensionService);
    expect(service).toBeTruthy();
  });
});
