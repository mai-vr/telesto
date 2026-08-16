import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth-service';

export const authGuardGuard: CanActivateFn = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router)
  const isLoggedIn = await authService.isLoggedIn();

  if (isLoggedIn) {
    return true;
  }

  return router.createUrlTree(['/welcome'])
};
