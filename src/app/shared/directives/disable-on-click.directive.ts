import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDisableOnClick]',
  standalone: true
})
export class DisableOnClickDirective {
  constructor(private el: ElementRef<HTMLButtonElement>) {}

  @HostListener('click')
  onClick() {
    this.el.nativeElement.disabled = true;
  }
}
