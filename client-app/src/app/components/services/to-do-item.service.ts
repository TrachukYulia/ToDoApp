import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDoItem } from '../models/to-do-item/to-do-item.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ToDoItemService {

  FormData!: ToDoItem;
  
  constructor(private http: HttpClient) {
  
   }

addToDoItem(model: ToDoItem): Observable<void>
 {
   return this.http.post<void>('https://localhost:7085/api/ToDoItem', model)
 }

getToDoItem(): Observable<any> {
  return this.http.get('https://localhost:7085/api/ToDoItem');
}
getById( id: number): Observable<any> {
  return this.http.get('https://localhost:7085/api/ToDoItem/'+id);
}
updateToDoItem( id: number, categoryData: any): Observable<any> {
  return this.http.put('https://localhost:7085/api/ToDoItem/'+id, categoryData);
}
deleteToDoItem(id: number): Observable<any> {
  return this.http.delete('https://localhost:7085/api/ToDoItem/'+id);
}
}
