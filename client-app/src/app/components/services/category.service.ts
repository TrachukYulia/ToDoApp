import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Category } from '../models/category/category.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  FormData!: Category;
  
  constructor(private http: HttpClient) {
  
   }

addCategory(model: Category): Observable<void>
 {
   return this.http.post<void>('https://localhost:7085/api/Category', model)
 }

getCategory(): Observable<any> {
  return this.http.get('https://localhost:7085/api/Category');
}
getById( id: number): Observable<any> {
  return this.http.get('https://localhost:7085/api/Category/'+id);
}
updateCategory( id: number, categoryData: any): Observable<any> {
  return this.http.put('https://localhost:7085/api/Category/'+id, categoryData);
}
deleteCategory(id: number): Observable<any> {
  return this.http.delete('https://localhost:7085/api/Category/'+id);
}
}
