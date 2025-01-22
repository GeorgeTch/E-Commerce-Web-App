import { HttpInterceptorFn } from '@angular/common/http';
import { LoaderService } from '../services/loader.service';
import { finalize } from 'rxjs';
import { inject } from '@angular/core';

export const LoaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService); // Access service via DI
  loaderService.show(); // Show loader before the request is sent

  return next(req).pipe(
    finalize(() => loaderService.hide()) // Hide loader after request completes
  );
};
