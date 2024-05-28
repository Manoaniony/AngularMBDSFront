import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appSpinnerColor]',
  standalone: true
})
export class SpinnerColorDirective {
  @Input('appSpinnerColor') spinnerColor: string | undefined = "white"; // Accept color as input

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    console.log("directive spinner ", this.spinnerColor);

    // Set the color of the stroke style property
    this.el.nativeElement.style.stroke = this.spinnerColor;
  }
}
