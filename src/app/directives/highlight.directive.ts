import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el:ElementRef ) {
    console.log(el);
    el.nativeElement.style.backgroundColor="red"
    el.nativeElement.style.color="black"
    el.nativeElement.style.borderRadius="10px"
    el.nativeElement.style.fontWeight="bold"
   }

}
