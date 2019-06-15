import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import * as actions from './actions';
import * as selectors from '../selectors';
import * as ratingSelectors from '../rating/selectors';
import { LoadableRatingScore } from '../model/rating';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  product$ = this.store.select(selectors.getCurrentProduct);

  customerRating$: Observable<LoadableRatingScore> = this.store.select(
    ratingSelectors.getCurrentProductRating
  );

  constructor(
    private readonly store: Store<{}>,
    private readonly location: Location
  ) {
    this.store.dispatch(new actions.FetchCurrentProduct());
    this.store.dispatch(new actions.GetCurrentProductRating());
  }

  setRating(id: string, rating: number) {
    this.store.dispatch(new actions.SetRating({ id, rating }));
  }

  addToCart(itemId: string) {
    this.store.dispatch(actions.addItem({itemId }));
  }

  back() {
    this.location.back();
  }
}
