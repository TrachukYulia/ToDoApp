import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../../../components/services/auth.service';

export const AuthGuardComponent: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = localStorage.getItem('token');
  if (token) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};