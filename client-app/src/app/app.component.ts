import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NavbarComponent } from './pages/main-page/components/navbar/navbar.component';
import { SidebarComponent } from "./pages/main-page/components/sidebar/sidebar.component";
import { MainContentComponent } from './pages/main-page/components/main-content/main-content.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './pages/main-page/components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './components/services/auth.service';
import { LoginComponent } from './pages/signin/login/login.component';
import { RegisterComponent } from './pages/signup/register.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    NavbarComponent,
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MainContentComponent,
    SidebarComponent,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FooterComponent,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    LoginComponent,
    RegisterComponent,
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [],

  
})
export class AppComponent implements OnInit{
  title = 'client-app';
  constructor(private _authService: AuthService
  ) {}
  ngOnInit(): void {
    this._authService.checkAuthentication();
  }
}
