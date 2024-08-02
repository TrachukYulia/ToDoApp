import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TaskService } from '../../services/task.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { ToDoItem } from '../../models/to-do-item/to-do-item.model';
import { SnackbarService } from '../../services/snackbar.service';
@Component({
  selector: 'app-edit-to-do-item',
  standalone: true,
  imports: [
    FormsModule, HttpClientModule, CommonModule, MatDialogModule, MatButtonModule,
    MatIconModule, MatFormFieldModule, MatInputModule, 
    MatDatepickerModule,
    MatNativeDateModule, ReactiveFormsModule, 
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './edit-to-do-item.component.html',
  styleUrl: './edit-to-do-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None

})
export class EditToDoItemComponent implements OnInit {
  editTaskForm!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<EditToDoItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private _taskService: TaskService,  
    private _snackbarService: SnackbarService
  ) {
    console.log('Received data:', data);
  }
  ngOnInit(): void {
    this.editTaskForm = this._formBuilder.group({
      name: [this.data?.name || '', Validators.required],
      dueDate: [this.data.dueDate, Validators.required],
      idDone: [this.data.isDone]
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onFormSubmit(): void {
    if (this.editTaskForm.valid) {
      const updatedTaskData: ToDoItem = {
        ...this.editTaskForm.value,
        dueDate: this.formatDate(this.editTaskForm.value.dueDate)
      };
      this._taskService.updateToDoItem(this.data.id, updatedTaskData).subscribe({
        next: (val: any) => {
          this._snackbarService.openSnackBar('Task updated successfully!');
          this.dialogRef.close(true);
        },
        error: (err: any) => {
          this._snackbarService.openSnackBar('Failed to update task.');
          console.error(err);
        }
      });
    } 
  }
  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`;
  }
}

