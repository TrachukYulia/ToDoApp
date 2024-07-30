import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TaskService } from '../../services/task.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { ToDoItem } from '../../models/to-do-item/to-do-item.model';
import { Observable } from 'rxjs';
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
  ) {
    console.log('Received data:', data);
  }
  ngOnInit(): void {
    this.editTaskForm = this._formBuilder.group({
      name: [this.data?.name || '', Validators.required],
      dueDate: [this.data.date, Validators.required],
      idDone: [false]
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onFormSubmit(): void {
    console.log('Form values before submit:', this.editTaskForm.value); 
    if (this.editTaskForm.valid) {
      const updatedTaskData = this.editTaskForm.value as ToDoItem;
      this._taskService.updateToDoItem(this.data.id, updatedTaskData).subscribe({
        next: (val: any) => {
          console.log('Update!', val); 
          this.dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
        }
      });
    } 
  }
}
