import {
  Component,
  ElementRef,
  Renderer,
  Input,
  Output,
  Optional,
  EventEmitter,
  ViewEncapsulation
} from '@angular/core';


@Component({
  selector: 'image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css'],
  encapsulation: ViewEncapsulation.None
})


export class ImageSlider {

  @Input('playInterval') interval: any = 100;
  slides: any;
  @Input() sliderCss: string = '';

  @Input("slides") set _slides(s) {
    if (s.length > 0) {
      s[0].hidden = false;
    }
    this.slides = s;
    console.log(this.slides);
    this.number = this.slides.length;
    if (this.slides.length)
      this.slides[0]["classes"] = ["active"];
  }

  @Input('autoPlay') set _autoPlay(b: boolean) {
    this.autoPlay = b
    if (b) {
      this.auto(this.interval);
    }
  }
  currentElement: number = 0;
  autoPlay = false;
  number: number = 0;
  intervalTime: number = 100;//in ms(mili seconds)
  private delayHideSetTimeOutControl: any;

  constructor() { }

  heightChangeEvent() {
    switch (this.sliderCss) {
      case 'bookUniqueHomeDetail':
        return { 'height': "400px" };
      case 'bookUniqueHomeSearch':
        return { 'height': "200px" };
      case 'bookTaxiDetail':
        return { 'height': "600px" };
      case 'bookTaxiSearch':
        return { 'height': "180px" };
      case 'mainIndex':
        return { 'height': "400px" };
      case 'bookExperienceSearch':
        return { 'height': "200px" };

    }
  }

  sliderShowDisplay(index, li) {
    let val = li === false ? 'unset' : 'none';
    // if (index === 0) {
    //     return { 'display': "unset" };
    // } else {
    //     return { 'display': "none" };
    // }
    return { 'display': val };
  }

  backWard() {
    if (this.autoPlay)
      clearInterval(this.interval);
    this.currentElement = this.currentElement - 1;
    if (this.currentElement < 0) {
      this.currentElement = this.number - 1;
    }
    this.removeClasses();
    var prev = this.currentElement == this.number - 1 ? 0 : this.currentElement + 1;
    this.slides[prev].classes = ["animateForward"];
    this.show(this.slides[prev]);
    this.show(this.slides[this.currentElement]);

    clearTimeout(this.delayHideSetTimeOutControl);

    this.delayHideSetTimeOutControl = this.delayHide(this.slides[prev], 200);
    this.slides[this.currentElement].classes = ["active", "backward"];
    if (this.autoPlay) this.auto(this.intervalTime);
  }

  removeClasses() {
    for (var i = 0; i < this.number; i++) {
      this.slides[i].classes = {}
    }
  }
  forWard() {
    console.log("forward called")
    if (this.autoPlay) clearInterval(this.interval);
    this._forWard();
    if (this.autoPlay) this.auto(this.intervalTime);
  }
  private _forWard() {
    this.currentElement = 1 + this.currentElement;
    if (this.currentElement >= this.number) {
      this.currentElement = 0;
    }
    this.removeClasses();
    var prev = this.currentElement == 0 ? this.number - 1 : this.currentElement - 1;
    console.log(this.slides[prev]);
    this.slides[prev]["classes"] = ["animateBack"];

    this.show(this.slides[prev]);
    this.show(this.slides[this.currentElement]);

    clearTimeout(this.delayHideSetTimeOutControl);
    this.delayHideSetTimeOutControl = this.delayHide(this.slides[prev], 200);
    this.slides[this.currentElement].classes = ["active", "forward"];
  }
  auto(ms) {
    this.autoPlay = true;
    this.intervalTime = ms;
    this.interval = setInterval(this._forWard.bind(this), ms);
  }
  delayHide(el, ms) {
    return setTimeout(() => el.hidden = true, ms);
  }
  show(el) {
    el.hidden = false;
  }

  imageCssClass() {
    switch (this.sliderCss) {
      case 'bookUniqueHomeDetail':
        return { 'bookUniqueHomeDetailCss': true };
      case 'bookUniqueHomeSearch':
        return { 'bookUniqueHomeSearchCss': true };
      case 'bookTaxiDetail':
        return { 'bookTaxiDetailCss': true };
      case 'bookTaxiSearch':
        return { 'bookTaxiSearchCss': true };
      case 'mainIndex':
        return { 'mainIndexCss': true };
      case 'bookExperienceSearch':
        return { 'bookExperienceSearchCss': true };
    }
  }
}