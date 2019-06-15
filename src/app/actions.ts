import { createAction, props } from '@ngrx/store';
import { Product } from './model/product';

export const fetchProductsSuccess = createAction(
  '[Products API] Fetch Products success',
  props<{ products: Product[] }>()
);

export const fetchProductsError = createAction(
  '[Products API] Fetch Products error'
);
