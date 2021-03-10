import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAuthenticationAddComponent } from './user-authentication-add.component';

describe('UserAuthenticationAddComponent', () => {
  let component: UserAuthenticationAddComponent;
  let fixture: ComponentFixture<UserAuthenticationAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAuthenticationAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAuthenticationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
