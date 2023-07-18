import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    setInterval(() => {
      this.rotate();
    }, 4000);
  }

  rotate(): void {
    const slider = this.el.nativeElement.querySelector('.slider');
    const firstChild = slider.firstElementChild.cloneNode(true);
    slider.removeChild(slider.firstElementChild);
    slider.appendChild(firstChild);
  }

}
