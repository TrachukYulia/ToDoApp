import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../components/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../components/services/task.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string ='';
  password: string ='';
  errorMessage!: string;

  constructor(private _authService: AuthService,
              private _taskService: TaskService,
              private router: Router) {

  }

  login(): void {
    this._authService.login(this.username, this.password).subscribe({
      next: () => {
        this._authService.userId$.subscribe(userId => {
          if (userId) {
            console.log('Logged in with ID:', userId);
            this.router.navigate(['/home']);
          } else {
            console.error('User ID is null or undefined');
          }
        });
      },
      error: (error) => {
        this.errorMessage = 'Invalid username or password';
      }
    });
  }
}
