import { Action, createAction, props } from '@ngrx/store';
import { Product } from '../model/product';
import { RatingScore } from '../model/rating';

export const addItem = createAction('[Product Details] add one item',
props<{itemId: string}>());

export const FETCH_CURRENT_PRODUCT = '[Product Details] Fetch current product';
export class FetchCurrentProduct implements Action {
  readonly type = FETCH_CURRENT_PRODUCT;
}

export const fetchProductSuccess = createAction(
  '[Products Api] Fetch single Product success',
  props<{ product: Product }>()
);

export const FETCH_PRODUCT_ERROR = '[Products Api] Fetch single Product error';
export class FetchProductError implements Action {
  readonly type = FETCH_PRODUCT_ERROR;
}

export const GET_CURRENT_PRODUCT_RATING =
  '[Product Details] get rating for current product';
export class GetCurrentProductRating implements Action {
  readonly type = GET_CURRENT_PRODUCT_RATING;
}

export const SET_RATING = '[Product Details] set rating';
export class SetRating implements Action {
  readonly type = SET_RATING;
  constructor(readonly score: RatingScore) {}
}

export type All =
  | FetchCurrentProduct
  | FetchProductError
  | GetCurrentProductRating
  | SetRating;
