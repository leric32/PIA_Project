import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistartionAdminComponent } from './registartion-admin.component';

describe('RegistartionAdminComponent', () => {
  let component: RegistartionAdminComponent;
  let fixture: ComponentFixture<RegistartionAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistartionAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistartionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
