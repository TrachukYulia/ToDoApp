import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToDoItem } from '../models/to-do-item/to-do-item.model';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category/category.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private allTasks: ToDoItem[] = [];
  private tasksSubject = new BehaviorSubject<ToDoItem[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor(private http: HttpClient) {
    this.fetchTasks();
  }

  private fetchTasks(): void {
    this.getToDoItem().subscribe(tasks => {
      this.allTasks = tasks;
      console.log('All tasks loaded:', this.allTasks);
      this.tasksSubject.next(this.allTasks);
    });
  }

  addToDoItem(model: ToDoItem): Observable<void> {
    return this.http.post<void>('https://localhost:7085/api/ToDoItem', model);
  }

  getToDoItem(): Observable<any> {
    return this.http.get('https://localhost:7085/api/ToDoItem');
  }

  getById(id: number): Observable<any> {
    return this.http.get('https://localhost:7085/api/ToDoItem/' + id);
  }

  updateToDoItem(id: number, categoryData: any): Observable<any> {
    return this.http.put('https://localhost:7085/api/ToDoItem/' + id, categoryData);
  }

  deleteToDoItem(id: number): Observable<any> {
    return this.http.delete('https://localhost:7085/api/ToDoItem/' + id);
  }

  filterTasksByCategory(categoryId: number): void {
    const filteredTasks = this.allTasks.filter(task => task.categoryId === categoryId);
    console.log('Filtered tasks for categoryId', categoryId, filteredTasks);
    this.tasksSubject.next(filteredTasks);
  }
}
