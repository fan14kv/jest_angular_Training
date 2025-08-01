import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditComponent } from './user-edit.component';
import { ActivatedRoute, Router } from '@angular/router';

describe('UserEditComponent', () => {
  let component: UserEditComponent;
  let fixture: ComponentFixture<UserEditComponent>;
  let activatedRouteMock = {
    snapshot:{
      paramMap:{
        get:(id:string)=> "123"
      }
    }
  };
  let routerMock = { navigate:jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserEditComponent],
      providers:[
        {provide:ActivatedRoute, useValue:activatedRouteMock},
        {provide:Router, useValue:routerMock}
      ]
    });
    fixture = TestBed.createComponent(UserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit',()=>{
    it('should get the router parem',()=>{
      component.ngOnInit();
      expect(component.userId()).toBe('123');
    });
  });

  describe('save',()=>{
    it('should navigate to /user on save()',()=>{
    component.save();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/users']);
    })

  })
});
