import { CanActivate, Router } from '@angular/router';

export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate() {
    if (sessionStorage.getItem('token')) {
      return true;
    }
    this.router.navigate(['/']);
  }
}
