import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../../../components/services/auth.service';


@Injectable()
export class AuthInterceptorComponent implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.getToken();
        const authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
        return next.handle(authReq).pipe(
            catchError(err => {
                if (err.status === 401) {
                    return this.authService.refreshToken().pipe(
                        switchMap(() => {
                            const newToken = this.authService.getToken();
                            const newAuthReq = req.clone({
                              setHeaders: {
                                Authorization: `Bearer ${newToken}`
                              }
                            });
                            return next.handle(newAuthReq);
                        })
                    );
                } else {
                    return throwError(err);
                }
            })
        );
    }
}

