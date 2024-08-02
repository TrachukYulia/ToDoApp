import { Routes } from '@angular/router';
import { LoginComponent } from './pages/signin/login/login.component';
import { RegisterComponent } from './pages/signup/register.component';
import { AuthGuardComponent } from './pages/signin/auth-guard/auth-guard.component';
import { HomeComponent } from './pages/main-page/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardComponent] },
  { path: '**', redirectTo: 'login' },
]
