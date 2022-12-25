import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HideHeaderDirective } from './hide-header.directive';
import { ParallaxDirective } from './parallax.directive';



@NgModule({
  declarations: [
    HideHeaderDirective,
    ParallaxDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [ParallaxDirective, HideHeaderDirective]
})
export class SharedDirectivesModule { }
