import { Directive, ElementRef, OnChanges, Input } from '@angular/core';

@Directive({
  selector: '[appScrollIntoView]',
})
export class ScrollIntoViewDirective implements OnChanges {
  @Input() appScrollIntoView: boolean;

  constructor(private elRef: ElementRef) {}

  ngOnChanges() {
    if (this.appScrollIntoView) {
      this.elRef.nativeElement.scrollIntoView();
    }
  }
}
