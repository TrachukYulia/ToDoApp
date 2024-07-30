import { Component, ViewEncapsulation } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TaskService } from '../../components/services/task.service';
import { ToDoItem } from '../../components/models/to-do-item/to-do-item.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ MatIconModule,
    MatIconModule,
    MatInputModule, 
    MatFormFieldModule,
  CommonModule, FormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  encapsulation: ViewEncapsulation.None
})
export class FooterComponent {
  newTaskName: string = '';
  showAddTaskInput: boolean = false;

  constructor(private _taskService: TaskService) {}

  addTask() {
    const categoryId = this._taskService.getSelectedCategoryId();
    if (categoryId !== null && this.newTaskName) {
      const newTask: ToDoItem = {
        id: 0, // or some temporary id, will be replaced by backend
        name: this.newTaskName,
        isDone: false,
        dueDate: new Date(),
        categoryId: categoryId
      };
      this._taskService.addToDoItem(newTask).subscribe(() => {
        this._taskService.filterTasksByCategory(categoryId);
        this.newTaskName = '';
      });
    }
  }
}
