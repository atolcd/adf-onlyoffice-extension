import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlyofficeExtensionComponent } from './onlyoffice-extension.component';

describe('OnlyofficeExtensionComponent', () => {
  let component: OnlyofficeExtensionComponent;
  let fixture: ComponentFixture<OnlyofficeExtensionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlyofficeExtensionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlyofficeExtensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
