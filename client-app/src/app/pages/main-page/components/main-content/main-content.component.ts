import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, NgModule, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../../components/services/category.service';
import { TaskService } from '../../../../components/services/task.service';
import { FormsModule } from '@angular/forms';
import { EditToDoItemComponent } from '../../../../components/to-do-item/edit-to-do-item/edit-to-do-item.component';
import { MatDialog } from '@angular/material/dialog';
import { ToDoItem } from '../../../../components/models/to-do-item/to-do-item.model';
import { Observable, Subscription, switchMap, tap } from 'rxjs';
import { SnackbarService } from '../../../../components/services/snackbar.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { AuthService } from '../../../../components/services/auth.service';

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
    MatExpansionModule
  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css',
})
export class MainContentComponent implements OnInit {
  userId!: any;
  userId$: Observable<number | null> = this._taskService.userId$;
  tasks: any[] = [];
  tasks$: Observable<ToDoItem[]> | undefined;
  completedTasks: any[] = [];
  category: any[] = [];
  selectedCategoryId: number = 1;
  selectedCategoryName: string = '';
  expandedCompletedTasks: boolean = false;

  //paginator
  paginatedTasks: any[] = [];
  pageSize: number = 5;
  pageSizeOptions: number[] = [5, 10, 15];
  pageIndex: number = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(public dialog: MatDialog,
    private _categoryService: CategoryService,
    private _taskService: TaskService,
    private cdr: ChangeDetectorRef,
    private _snackbarService: SnackbarService,
    private _authService: AuthService
  ) { }
  ngOnInit(): void {
    this._authService.userId$.subscribe(userId => {
      this.userId = userId;
      this.getCategory()
      this._taskService.setUserId(this.userId);
      this._taskService.fetchTasks(this.userId);
    });
    this._taskService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
      this.tasks = tasks.filter(task => !task.isDone);
      this.completedTasks = tasks.filter(task => task.isDone);
      this.updatePaginatedTasks();
      this.cdr.detectChanges();
    });

    this._taskService.selectedCategory$.subscribe(category => {
      if (category) {
        this.selectedCategoryName = category.name;
        this.selectedCategoryId = category.id;
        this._taskService.filterTasksByCategory(this.userId, category.id,);
      }
    });
  }

  toggleTaskCompletion(task: ToDoItem): void {
    task.isDone = !task.isDone;
    this._taskService.updateToDoItem(task.id, task).subscribe(() => {
      this.getTasks();
    });
  }
  getTasks(): void {
    this._taskService.tasks$.subscribe(tasks => {
      this.tasks = tasks.filter(task => !task.isDone);
      this.completedTasks = tasks.filter(task => task.isDone);
      this.updatePaginatedTasks();
    });
  }
  updatePaginatedTasks() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedTasks = this.tasks.slice(startIndex, endIndex);
  }
  getTodoItems(): void {
    this._taskService.tasks$.subscribe(tasks => {
      this.tasks = tasks.filter(task => !task.isDone);
      this.selectedCategoryName = this.category
        .filter(category => category.id === this.selectedCategoryId)
        .map(category => category.name)[0];
      this.updatePaginatedTasks();
    });
  }
  getCategory(): void {
    this._categoryService.getCategory(this.userId).subscribe(category => {
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

  expandCompletedTasks() {
    this.expandedCompletedTasks = true;
    this.updatePaginatedTasks();
  }

  collapseCompletedTasks() {
    this.expandedCompletedTasks = false;
    this.updatePaginatedTasks();
  }

  editTask(task: any) {
    console.log(task)
    const dialogRef = this.dialog.open(EditToDoItemComponent, {
      data: { id: task.id, name: task.name, date: task.dueDate, isDone: task.isDone },
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          if (this.selectedCategoryId !== null) {
            this._taskService.filterTasksByCategory(this.userId, this.selectedCategoryId);
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
