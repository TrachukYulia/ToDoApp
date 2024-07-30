import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NavbarComponent } from './core/navbar/navbar.component';
import { SidebarComponent } from "./main-page/sidebar/sidebar.component";
import { MainContentComponent } from './main-page/main-content/main-content.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './core/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { Category } from './components/models/category/category.model';
import { TaskService } from './components/services/task.service';
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
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client-app';
  constructor(private _taskService: TaskService) {}

  onCategorySelected(category: Category) {
    this._taskService.filterTasksByCategory(category.id);
    console.log('Category selected:', category);
  }
}
