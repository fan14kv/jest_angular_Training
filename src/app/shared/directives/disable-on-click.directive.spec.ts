import { ElementRef } from "@angular/core";
import { DisableOnClickDirective } from "./disable-on-click.directive";

describe("DisableOnClickDirective",()=>{
    const element = document.createElement('button');
    const elRef = new ElementRef(element);
    it("should diplay the element when onClick is called",()=>{
        const directive = new DisableOnClickDirective(elRef);
        directive.onClick();
        expect(element.disabled).toBe(true);
    })
});