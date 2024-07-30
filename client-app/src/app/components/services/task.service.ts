import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ToDoItem } from '../models/to-do-item/to-do-item.model';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category/category.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasksSubject = new BehaviorSubject<ToDoItem[]>([]);
  tasks$ = this.tasksSubject.asObservable();
  private selectedCategoryId: number | null = null;

  private selectedCategorySubject = new BehaviorSubject<Category | null>(null);
  selectedCategory$ = this.selectedCategorySubject.asObservable();

  constructor(private http: HttpClient) {
    this.fetchTasks();
    this.selectedCategory$.subscribe(category => {
      if (category) {
        this.filterTasksByCategory(category.id);
      }
    });
  }

  fetchTasks(): void {
    this.http.get<ToDoItem[]>('https://localhost:7085/api/ToDoItem').subscribe(tasks => {
      this.tasksSubject.next(tasks);
    });
  }
  addToDoItem(task: ToDoItem): Observable<void> {
    return this.http.post<void>('https://localhost:7085/api/ToDoItem', task).pipe(
      tap(() => {
        this.tasksSubject.next([...this.tasksSubject.value, task]);
      })
    );
  }
  getById(id: number): Observable<any> {
    return this.http.get('https://localhost:7085/api/ToDoItem/' + id);
  }

  updateToDoItem(id: number, updatedTaskData: ToDoItem): Observable<ToDoItem> {
    return this.http.put<ToDoItem>(`https://localhost:7085/api/ToDoItem/${id}`, updatedTaskData).pipe(
      tap(updatedTask => {
        if (updatedTask) {
          const tasks = this.tasksSubject.value;
          const index = tasks.findIndex(task => task.id === id);
          if (index !== -1) {
            tasks[index] = updatedTask;
            this.tasksSubject.next([...tasks]);
          }
        }
      })
    );
  }

  deleteToDoItem(id: number): Observable<any> {
    return this.http.delete('https://localhost:7085/api/ToDoItem/' + id).pipe(
      tap(() => {
        const currentTasks = this.tasksSubject.value;
        const updatedTasks = currentTasks.filter(task => task.id !== id);
        this.tasksSubject.next(updatedTasks);
      })
    );
  }
  filterTasksByCategory(categoryId: number): void {
    this.selectedCategoryId = categoryId;
    this.http.get<ToDoItem[]>('https://localhost:7085/api/ToDoItem').subscribe(tasks => {
      const filteredTasks = tasks.filter(task => task.categoryId === categoryId);
      this.tasksSubject.next(filteredTasks);
    });
  }
  
  getSelectedCategoryId(): number | null {
    return this.selectedCategoryId;
  }
  setSelectedCategory(category: Category): void {
    this.selectedCategorySubject.next(category);
  }
}
