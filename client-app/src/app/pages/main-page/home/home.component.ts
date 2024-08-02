import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Category } from '../../../components/models/category/category.model';
import { AuthService } from '../../../components/services/auth.service';
import { TaskService } from '../../../components/services/task.service';
import { LoginComponent } from '../../signin/login/login.component';
import { RegisterComponent } from '../../signup/register.component';
import { FooterComponent } from '../components/footer/footer.component';
import { MainContentComponent } from '../components/main-content/main-content.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
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
    RegisterComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  userId: any;
  constructor(private _taskService: TaskService,
    private _authService: AuthService
) {}
ngOnInit(): void {
  this.getUserId();
this._authService.checkAuthentication();
}
getUserId(): void{
  this._authService.getUserId().subscribe({
    next: (id) => {
      this.userId = id;
      console.log('User id from sidebar', id);
    },
    error: (err) => console.error('Error fetching user ID:', err),
    complete: () => {console.log('User ID fetch complete')
  }});
}
onCategorySelected(category: Category) {
this._taskService.filterTasksByCategory(this.userId, category.id);
console.log('Category selected:', category);
}
}
