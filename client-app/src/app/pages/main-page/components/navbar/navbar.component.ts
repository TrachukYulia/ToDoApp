import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../components/services/auth.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,    
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  username: any;
  constructor(private _authService: AuthService) { }

  logout(): void {
    this._authService.logout();
  }
  getUsername(): void{
    this._authService.getUsername().subscribe({
      next: (name) => {
        this.username = name;
        console.log('User id from sidebar', name);
      },
      error: (err) => console.error('Error fetching user ID:', err),
      complete: () => {console.log('User ID fetch complete')}
    });
  }
  ngOnInit(): void {
    this.getUsername();
  }
}

