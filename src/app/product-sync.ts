import {ActionReducer, INIT, UPDATE} from '@ngrx/store';
import {ProductState} from './reducer';

export function productSync(reducer: ActionReducer<{ product: ProductState }>) {
  return (state, action) => {
    let reducedState = reducer(state, action);
    if (action.type === INIT) {
      const data = window.localStorage.getItem('productData');
      if (data) {
        reducedState = {
          product: {
            ...reducedState.product,
            products: JSON.parse(data),
          }            
        };
      }
    } else if (action.type !== UPDATE) {
      window.localStorage.setItem(
        'productData',
        JSON.stringify(reducedState.product.products)
      );
    }
    return reducedState;
  };
}