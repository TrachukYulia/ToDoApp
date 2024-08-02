import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TaskService } from '../../../../components/services/task.service';
import { ToDoItem } from '../../../../components/models/to-do-item/to-do-item.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../components/services/auth.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatIconModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule, FormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  encapsulation: ViewEncapsulation.None
})
export class FooterComponent implements OnInit {
  newTaskName: string = '';
  showAddTaskInput: boolean = false;
  userId: any;

  constructor(private _taskService: TaskService,
    private _authService: AuthService) { }
  ngOnInit(): void {
    this.getUserId()
  }

  addTask() {
    const categoryId = this._taskService.getSelectedCategoryId();
    if (categoryId !== null && this.newTaskName) {
      const newTask: ToDoItem = {
        id: 0, 
        name: this.newTaskName,
        isDone: false,
        dueDate: new Date(),
        categoryId: categoryId,
        userId: this.userId

      };
      this._taskService.addToDoItem(newTask).subscribe(() => {
        this._taskService.filterTasksByCategory(this.userId, categoryId);
        this.newTaskName = '';
      });
    }
  }
  getUserId(): void {
    this._authService.getUserId().subscribe({
      next: (id) => {
        this.userId = id;
        console.log('User id from main', id);
      },
      error: (err) => console.error('Error fetching user ID:', err),
      complete: () => { console.log('User ID fetch complete') }
    });
  }
}
