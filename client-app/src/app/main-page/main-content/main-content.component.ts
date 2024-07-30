import { ChangeDetectorRef, Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../components/services/category.service';
import { TaskService } from '../../components/services/task.service';
import { FormsModule } from '@angular/forms';
import { EditToDoItemComponent } from '../../components/to-do-item/edit-to-do-item/edit-to-do-item.component';
import { MatDialog } from '@angular/material/dialog';
import { ToDoItem } from '../../components/models/to-do-item/to-do-item.model';
import { Observable, Subscription } from 'rxjs';
import { SnackbarService } from '../../components/services/snackbar.service';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [MatListModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule, 
    MatFormFieldModule,
    MatPaginator,
    MatPaginatorModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css'
})
export class MainContentComponent implements OnInit{
  tasks: any[] = [];
  tasks$: Observable<ToDoItem[]> | undefined;
  category: any[] =[];
  selectedCategoryId: number = 1;
  selectedCategoryName: string = '';
  private deletedTask: ToDoItem | null = null;

  //paginator
  paginatedTasks: any[] = [];
  pageSize: number = 5;
  pageSizeOptions: number[] = [5, 10, 15];
  pageIndex: number = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor( public dialog: MatDialog,
               private _categoryService: CategoryService,
               private _taskService: TaskService,
               private cdr: ChangeDetectorRef,
               private _snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.getCategory()
    this._taskService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
      this.updatePaginatedTasks();
      this.cdr.detectChanges(); 
    });
    this._taskService.selectedCategory$.subscribe(category => {
      if (category) {
        console.log("sjdsldlsld", category)
        this.selectedCategoryName = category.name;
        this.selectedCategoryId = category.id;
        this._taskService.filterTasksByCategory(category.id); 
      }
    });
  }
  toggleTaskCompletion(task: any) {
    this.tasks$ = this._taskService.tasks$; 
    task.isDone = !task.isDone;
  }
  updatePaginatedTasks() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedTasks = this.tasks.slice(startIndex, endIndex);
  }
  getTodoItems(): void {
    this._taskService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
      this.selectedCategoryName = this.category
        .filter(category => category.id === this.selectedCategoryId)
        .map(category => category.name)[0];
      this.updatePaginatedTasks(); 
      console.log('Items is get', this.tasks);
    });
  }
  getCategory(): void {
    this._categoryService.getCategory().subscribe(category => {
      this.category = category;
      console.log('Categories is get', this.category);
      this.getTodoItems();
    });
  }
  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updatePaginatedTasks();
  }

  editTask(task: any) {
    console.log(task)
    const dialogRef = this.dialog.open(EditToDoItemComponent, {
      data: { id: task.id, name: task.name, date: task.dueDate, isDone: task.isDone},
    });
    dialogRef.afterClosed().subscribe({
    next: (val) =>{
      if(val) {
        if (this.selectedCategoryId !== null) {
          this._taskService.filterTasksByCategory(this.selectedCategoryId);
        }
      }
    }
   })
  }
  deleteTask(task: ToDoItem): void {
      this._taskService.deleteToDoItem(task.id).subscribe({
        next: () => {
          this._snackbarService.openSnackBar('Task deleted successfully!');
          console.log('Task deleted successfully');
        },
        error: (err) => {
          this._snackbarService.openSnackBar('Failed to delete task.');
          console.error('Error deleting task:', err);
        }
      });
  }
}
