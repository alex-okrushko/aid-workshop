import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatProgressBarModule } from '@angular/material';
import { EffectsModule } from '@ngrx/effects';

import { StarsModule } from '../common/stars/stars.module';

import { ProductEffects } from './effects';
import { ProductDetailsComponent } from './product-details.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatProgressBarModule,
    MatCardModule,
    StarsModule,
    EffectsModule.forFeature([ProductEffects]),
  ],
  declarations: [ProductDetailsComponent],
})
export class ProductDetailsModule {}
