import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Category } from '../models/category/category.model';
import { Observable } from 'rxjs';
import { CategoryRequestModel } from '../models/category/category-request.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  FormData!: Category;
  
  constructor(private http: HttpClient) {
  
   }

addCategory(model: CategoryRequestModel): Observable<void>
 {
   return this.http.post<void>('https://localhost:7085/api/Category', model)
 }
getCategory(userId: number): Observable<any> {
  return this.http.get(`https://localhost:7085/api/Category/`, {
    params: new HttpParams().set('userId', userId.toString())
  });
}
updateCategory( id: number, categoryData: any): Observable<any> {
  return this.http.put('https://localhost:7085/api/Category/'+id, categoryData);
}
deleteCategory(id: number): Observable<any> {
  return this.http.delete('https://localhost:7085/api/Category/'+id);
}
}
