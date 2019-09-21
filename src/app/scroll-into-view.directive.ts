import { Directive, ElementRef, OnChanges, Input } from '@angular/core';

@Directive({
  selector: '[appScrollIntoView]',
})
export class ScrollIntoViewDirective implements OnChanges {
  @Input() appScrollIntoView: boolean;

  constructor(private elRef: ElementRef) {}

  ngOnChanges() {
    if (this.appScrollIntoView) {
      // give the tree time to animate and expand
      setTimeout(
        () =>
          this.elRef.nativeElement.scrollIntoView({
            behavior: 'smooth',
            inline: 'start',
          }),
        150,
      );
    }
  }
}
