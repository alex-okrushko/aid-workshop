import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as actions from './actions';
import * as homeActions from './home/actions';
import { ProductService } from './services/product.service';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class ProductEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly productService: ProductService,
    private readonly snackBar: MatSnackBar
  ) {}

  fetchProducts = createEffect(() => this.actions$.pipe(
    ofType(homeActions.fetchProducts),
    switchMap(() =>
      this.productService.getProducts().pipe(
        map(products => actions.fetchProductsSuccess({products})),
        catchError(() => of(actions.fetchProductsError()))
      )
    )
  ));

  handleFetchError = createEffect(() => this.actions$.pipe(
    ofType(actions.fetchProductsError),
    map(() => {
      // Setting the timeout, so that angular would re-run change detection.
      setTimeout(
        () =>
          this.snackBar.open('Error fetching products', 'Error', {
            duration: 2500,
          }),
        0
      );
    })
  ), { dispatch: false });
}
