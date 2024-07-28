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

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatListModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    RouterLink,
    HttpClientModule,
    MatInputModule, 
    MatFormFieldModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  // mainMenuItems = [
  //   {name: 'My Day', icon: 'wb_sunny'},
  //   {name: 'Important', icon: 'star'},
  //   {name: 'Planned', icon: 'event'},
  //   {name: 'Assigned to me', icon: 'assignment_ind'},
  //   {name: 'Tasks', icon: 'task'}
  // ];

  // otherMenuItems = [
  //   {name: 'Getting started', icon: 'play_circle_filled'},
  //   {name: 'Groceries', icon: 'shopping_cart'},
  //   {name: 'Routine', icon: 'repeat'},
  //   {name: 'Untitled list', icon: 'list'}
  // ];
  mainMenuItems: any[] = [];
  otherMenuItems: any[] = [];
  @Output() categorySelected = new EventEmitter<Category>();

  constructor( private _categoryService: CategoryService,) {}
  selectCategory(category: Category): void {
    this.categorySelected.emit(category);
    console.log("Selected category", category)
  }

  addCategory(name: string): void {
  }
  ngOnInit(): void {
    this._categoryService.getCategory().subscribe(categories => {
      this.mainMenuItems = categories.filter((category: { priority: any; }) => category.priority === 1);
      this.otherMenuItems = categories.filter((category: { priority: any; }) => category.priority > 1);
    });
  }
}
