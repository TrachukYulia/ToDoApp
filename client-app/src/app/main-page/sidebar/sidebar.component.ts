import { Component, EventEmitter, NgModule, OnInit, Output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../components/services/category.service';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Category } from '../../components/models/category/category.model';
import { CategoryRequestModel } from '../../components/models/category/category-request.model';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../components/services/task.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports:[
    MatListModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    RouterLink,
    HttpClientModule,
    MatInputModule, 
    MatFormFieldModule,
    FormsModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  newCategoryName: string = ''
  mainMenuItems: any[] = [];
  otherMenuItems: any[] = [];
  @Output() categorySelected = new EventEmitter<Category>();

  constructor( private _categoryService: CategoryService, private _taskService: TaskService) {}
  selectCategory(category: Category): void {
    this._taskService.setSelectedCategory(category); 
  }
  getListOfCategory(): void{
    this._categoryService.getCategory().subscribe(categories => {
      this.mainMenuItems = categories.filter((category: { priority: any; }) => category.priority === 1);
      this.otherMenuItems = categories.filter((category: { priority: any; }) => category.priority > 1);
      if (this.mainMenuItems.length > 0) {
        this.selectCategory(this.mainMenuItems[0]);
      }
    });
    
  }
  addCategory(): void {
    if (this.newCategoryName) {
      const newCategory: CategoryRequestModel = {
        Name: this.newCategoryName,
      };
      this._categoryService.addCategory(newCategory).subscribe(() => {
        this.newCategoryName = '';
        this.getListOfCategory();  
      });
    }
  }
  ngOnInit(): void {    
    this.getListOfCategory();
  }
}
