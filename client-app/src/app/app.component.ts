import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {  } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NavbarComponent } from './core/navbar/navbar.component';
import { SidebarComponent } from "./main-page/sidebar/sidebar.component";
import { MainContentComponent } from './main-page/main-content/main-content.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './core/footer/footer.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CategoryService } from './components/services/category.service';
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
    HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client-app';
}
