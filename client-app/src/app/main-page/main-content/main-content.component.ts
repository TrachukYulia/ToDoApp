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
               private _todoItemService: ToDoItemService
  ) {}

  ngOnInit(): void {
    this._todoItemService.getToDoItem().subscribe(task => {
      this.tasks = task;
      console.log(this.tasks)
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageIndex = e.pageIndex;
  }
}
