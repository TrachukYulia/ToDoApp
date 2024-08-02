import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, tap } from 'rxjs';
import { ToDoItem } from '../models/to-do-item/to-do-item.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Category } from '../models/category/category.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasksSubject = new BehaviorSubject<ToDoItem[]>([]);
  tasks$ = this.tasksSubject.asObservable();
  private selectedCategoryId: number | null = null;
  private userIdSubject = new BehaviorSubject<number | null>(null);
  public userId$ = this.userIdSubject.asObservable();
  private selectedCategorySubject = new BehaviorSubject<Category | null>(null);
  selectedCategory$ = this.selectedCategorySubject.asObservable();
  private userId: any;
  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.getUserId().subscribe(userId => {
      if (userId) {
        this.setUserId(userId);
        this.fetchTasks(userId);
      }
    });

    combineLatest([this.userId$, this.selectedCategory$]).subscribe(([userId, category]) => {
      if (userId && category) {
        this.filterTasksByCategory(userId, category.id);
      }
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

  fetchTasks(userId: number): void {
    this.http.get<ToDoItem[]>('https://localhost:7085/api/ToDoItem', {
      params: new HttpParams().set('userId', userId.toString())
    }).subscribe(tasks => {
      this.tasksSubject.next(tasks);
    });
  }
  filterTasksByCategory(userId: number, categoryId: number): void {
    this.selectedCategoryId = categoryId;
    if(userId){}
    this.http.get<ToDoItem[]>('https://localhost:7085/api/ToDoItem', {
      params: new HttpParams()
        .set('userId', userId.toString())
        .set('categoryId', categoryId.toString()) 
    }).subscribe(tasks => {
      const filteredTasks = tasks.filter(task => task.categoryId === categoryId);
      this.tasksSubject.next(filteredTasks);
    });
  }
  
  setUserId(userId: number) {
    console.log('Setting user ID:', userId); // Для отладки
    this.userIdSubject.next(userId);
    this.userId = userId;
  }
  getUserId(): Observable<number | null> {
    return this.userId$;
  }
  getToDoItem(userId: number): Observable<any> {
    return this.http.get(`https://localhost:7085/api/ToDoItem/`, {
      params: new HttpParams().set('userId', userId.toString())
    });
  }
  getSelectedCategoryId(): number | null {
    return this.selectedCategoryId;
  }
  setSelectedCategory(category: Category): void {
    this.selectedCategorySubject.next(category);
  }
}
