import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {


  private undoSubject = new Subject<void>();


  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string = 'Ok', duration: number = 3000): void {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }
}

