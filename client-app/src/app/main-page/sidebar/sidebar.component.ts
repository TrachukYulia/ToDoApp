import { Component, EventEmitter, NgModule, OnInit, Output, ViewEncapsulation } from '@angular/core';
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
import { CategoryResponseModel } from '../../components/models/category/category-response.model';

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
  styleUrl: './sidebar.component.css',
  encapsulation: ViewEncapsulation.None

})
export class SidebarComponent implements OnInit{
  newCategoryName: string = ''
  mainMenuItems: any[] = [];
  otherMenuItems: any[] = [];
  searchQuery: string = '';
  filteredMainMenuItems: any[] = [];
  filteredOtherMenuItems: any[] = [];
  @Output() categorySelected = new EventEmitter<Category>();

  constructor( private _categoryService: CategoryService, private _taskService: TaskService) {}
  selectCategory(category: Category): void {
    this._taskService.setSelectedCategory(category); 
    
  }
  getListOfCategory(): void{
    this._categoryService.getCategory().subscribe(categories => {
      this.mainMenuItems = categories.filter((category: { priority: any; }) => category.priority === 1);
      this.otherMenuItems = categories.filter((category: { priority: any; }) => category.priority > 1);
      this.filteredMainMenuItems = this.mainMenuItems;
      this.filteredOtherMenuItems = this.otherMenuItems;
      if (this.mainMenuItems.length > 0) {
        this.selectCategory(this.mainMenuItems[0]);
      }
    });
    
  }
  filterCategories(): void {
    const query = this.searchQuery.toLowerCase();

    this.filteredMainMenuItems = this.mainMenuItems.filter(item =>
      item.name.toLowerCase().includes(query)
    );

    this.filteredOtherMenuItems = this.otherMenuItems.filter(item =>
      item.name.toLowerCase().includes(query)
    );
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
