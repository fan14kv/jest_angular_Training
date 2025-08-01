import { ComponentFixture, TestBed } from "@angular/core/testing";
import { UserDetailsComponent } from "./user-details.component";
import { UserService } from "../../shared/services/user.service";
import { of, throwError } from "rxjs";
import { UserCardComponent } from "../user-card/user-card.component";

describe('UserDetailsComponent',()=>{
    let fixture : ComponentFixture<UserDetailsComponent>;
    let component : UserDetailsComponent;
    let mockUserService:Partial<UserService>;
    mockUserService ={
      getUser: jest.fn().mockReturnValue(of({id:"10", name:"Kumar"}))
    }

    beforeEach(async()=>{
      await TestBed.configureTestingModule({
        imports:[UserDetailsComponent],
        providers:[
          {provide: UserService, useValue:mockUserService}
        ]
      }).compileComponents();
  
      fixture = TestBed.createComponent(UserDetailsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });



describe('ngOnInit',()=>{
  it("should call getUser service",()=>{
    component.ngOnInit();
    expect(mockUserService.getUser).toHaveBeenCalledWith(10);
    expect(component.user()?.id).toBe('10');
    expect(component.user()?.name).toBe('Kumar');
  });
  
  it("Error case",()=>{
    const consoleMock = jest.spyOn(console,'error').mockImplementation();
    jest.spyOn(mockUserService,'getUser').mockReturnValue(throwError(()=> new Error('Failed')));
    component.ngOnInit();
    expect(mockUserService.getUser).toHaveBeenCalledWith(10);
    expect(consoleMock).toHaveBeenLastCalledWith(expect.any(Error));
  });
});

describe('app-user-card',()=>{
  it("should pass correct userId to app-user-card",()=>{
    jest.spyOn(mockUserService,'getUser').mockReturnValue(of({id:"12", name:"Kumar",isActive:true}))
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.user()?.id).toBe('12');
    const fixtureElement = fixture.debugElement.query(
      d => d.componentInstance instanceof UserCardComponent
    );
    const mockUsercardInstance = fixtureElement.componentInstance as UserCardComponent;
    expect(mockUsercardInstance.userId).toBe("12");
  })
});






    describe('Sumbit',()=>{
      it('should not submit form if inputs are invalied',()=>{
      const form ={
        valid:false,
        value:{name:'',email:''}
      } as any
      component.onSubmit(form);
      expect(component.submitted()).toBe(false);
      });

      it('should submit form if inputs are valied',()=>{
        const form ={
        valid:true,
        value:{name:'Kumar',email:'kumar@gmail.com'}
      } as any
      component.onSubmit(form);
      expect(component.submitted()).toBe(true);
      })

    })
});