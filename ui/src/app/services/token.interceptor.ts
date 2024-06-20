import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoginResult } from '@models/login-result';
import { LocalStorageService } from '@services/common/local-storage.service';
import { Utility } from 'app/shared/utility';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorageService = inject(LocalStorageService);
  const loginResult = localStorageService.getLoginResult() as LoginResult;
  let _token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxZTQyZTViNC04OWM3LTRjNjEtYWY2Ni1hYmQwMjczMzcyZTMiLCJqdGkiOiI1OWRlYjE1MS05ZGYyLTQzMDgtODk1ZS0xMGZiYjliODVjMGUiLCJuYmYiOjE3MTgyODI2MDksImV4cCI6MTcxODI5MzQwOSwiaWF0IjoxNzE4MjgyNjA5LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUyNjQiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUyNjQifQ.rvpIKj2tE0j8oHD7xNeZ1pVX1-tCt6SxIwhXzIyGZHA';
  const nonAuthUrls = [`${Utility.serverUrl}/register`, `${Utility.serverUrl}/login`];

  if (!nonAuthUrls.includes(req.url)) {
    let reqWithToken = req.clone({
      setHeaders: {
        Authorization: `Bearer ${_token}`
      }
    });
    return next(reqWithToken);
  }
  return next(req);
};
