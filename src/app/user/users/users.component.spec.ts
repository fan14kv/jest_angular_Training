import { ComponentFixture, TestBed } from "@angular/core/testing"
import { UsersComponent } from "./users.component"
import { Component } from "@angular/core";

describe("UsersComponent",()=>{
  let fixture : ComponentFixture<UsersComponent>;
  let component : UsersComponent;
  beforeEach( async()=>{
    await TestBed.configureTestingModule({
      imports:[UsersComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('submit button',()=>{
    it("should disable the submit button when form is invalid",()=>{
      const button:HTMLButtonElement = fixture.nativeElement.querySelector('button');
      expect(button.disabled).toBe(true);
    });

    it("should Enable the submit button when form is valid",()=>{
      const button:HTMLButtonElement = fixture.nativeElement.querySelector('button');
      component.userForm.setValue({name:"Kumar",email:"kumar@gmail.com"});
      fixture.detectChanges();
      
      expect(button.disabled).toBe(false);
    });
  });
   describe('submit Form',()=>{
    it("should invalied when the field are empty",()=>{
      expect(component.userForm.valid).toBe(false);
      expect(component.userForm.get('name')?.errors?.['required']).toBe(true);
      expect(component.userForm.get('email')?.errors?.['required']).toBe(true);
    });

    it("should invalied when the field are empty",()=>{
      component.userForm.setValue({name:"Kumar",email:"kumar@gmail.com"});
      expect(component.userForm.valid).toBe(true);
      expect(component.userForm.get('name')?.errors?.['required']).toBeFalsy();
      expect(component.userForm.get('email')?.errors?.['required']).toBeFalsy();
    });
  });
   describe('OnSubmit',()=>{
    it('should set submit to true',()=>{
      const consoleSpy = jest.spyOn(console,'log');
      component.userForm.setValue({name:"Kumar",email:"kumar@gmail.com"});
      component.onSubmit();
      expect(component.submitted()).toBe(true);
      expect(consoleSpy).toHaveBeenCalledWith({name:"Kumar",email:"kumar@gmail.com"});

    });
   });

   it('should disable when the button is clicked',()=>{
    component.userForm.setValue({name:"Kumar",email:"kumar@gmail.com"});
    fixture.detectChanges();
    const button:HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBe(false);
    button.click();
    fixture.detectChanges();
    expect(button.disabled).toBe(true);
   })
})