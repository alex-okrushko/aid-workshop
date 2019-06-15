import * as actions from './actions';
import * as productActions from './product-details/actions';
import * as homeActions from './home/actions';
import { Product } from './model/product';
import { createReducer, on, Action} from '@ngrx/store';

import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';

export interface GlobalState {
  product: ProductState;
}

export interface ProductState {
  products: EntityState<Product>;
  isLoading: boolean;
}

// If your entity's id property is different you can spesify it during
// entity adapter creation.
export const productAdapter: EntityAdapter<Product> = createEntityAdapter();

const initState: ProductState = {
  products: productAdapter.getInitialState(),
  isLoading: false,
};

export function reducer(
  state: ProductState,
  action: Action) {
    return createReducer(
      initState,
      on(homeActions.fetchProducts, state => ({...state, isLoading: true })),
      on(actions.fetchProductsError, state => ({...state, isLoading: false })),
      on(actions.fetchProductsSuccess, (state, {products}) => ({
        products: productAdapter.upsertMany(products, state.products),
        isLoading: false,
      })),
      on(productActions.fetchProductSuccess, (state, {product}) => ({
        ...state,
        products: productAdapter.upsertOne(product, state.products),
      })),
      )(state, action);
}
