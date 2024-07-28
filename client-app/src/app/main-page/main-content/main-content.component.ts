import { Component, NgModule, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../components/services/category.service';
import { ToDoItemService } from '../../components/services/to-do-item.service';
import { Category } from '../../components/models/category/category.model';
import { TaskService } from '../../components/services/task.service';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [MatListModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule, 
    MatFormFieldModule,
    MatPaginator,
    MatPaginatorModule,
    CommonModule
  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css'
})
export class MainContentComponent implements OnInit{
  tasks: any[] = [];
  category: any[] =[];
  selectedCategoryId: number = 1;
  //paginator
  pageIndex = 0;
  pageSize = 10;
  length = 10;
  hidePageSize = true;
  showPageSizeOptions = false;
  showFirstLastButtons = true;
  disabled = false;
  pageEvent: PageEvent | undefined;

  constructor( private _categoryService: CategoryService,
               private _todoItemService: ToDoItemService,
               private _taskService: TaskService
  ) {}

  ngOnInit(): void {
    console.log("hello");
    this.getCategory();
    }
  
  getTodoItems(): void{
    this._taskService.tasks$.subscribe(task => {
      this.tasks = task;
      console.log('Items is get', this.tasks)
    });
  
  }
  getCategory():void{
    this._categoryService.getCategory().subscribe(category => {
      this.category = category;
      console.log('Categories is get', this.category)
      this.getTodoItems();
    });
  }

  

  filterTasks(category: Category) {
    this.selectedCategoryId = category.id;
    this._taskService.filterTasksByCategory(this.selectedCategoryId);
    console.log("Try to filter,selectedCategoryId ", this.selectedCategoryId)
  }
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageIndex = e.pageIndex;
  }
}
