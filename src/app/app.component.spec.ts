import { ComponentFixture, TestBed } from "@angular/core/testing"
import { AppComponent } from "./app.component"
import { Component } from "@angular/core";

describe("AppComponent",()=>{

    let component : AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    beforeEach(async()=>{
        await TestBed.configureTestingModule({
            imports:[AppComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("Shoud display input values", ()=>{
        component.name = "Kumar";
        component.email = "kumar@gmail.com";
        fixture.detectChanges();
        const elements = fixture.nativeElement as HTMLElement;
        expect(elements.textContent).toContain("Kumar");
        expect(elements.textContent).toContain("kumar@gmail.com");
    });

    it("shoud emit onselect when botton is clicked",()=>{
        jest.spyOn(component.onSelect,'emit')
        const button = fixture.nativeElement.querySelector('button');
        button.click();
        expect(component.onSelect.emit).toHaveBeenCalled();
    });
    
})