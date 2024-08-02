import { Component } from '@angular/core';
import { AuthService } from '../../components/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username!: string;
  email!: string;
  password!: string;
  errorMessage!: string;

  constructor(private _authService: AuthService, private router: Router) {}

  register(): void {
    this._authService.register(this.username, this.email, this.password).subscribe({
      next: () => {
        console.log("username received", this.username);
        console.log("Pass received", this.password);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.errorMessage = 'Registration failed';
      }
    });
  }
}
