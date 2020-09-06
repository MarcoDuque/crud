import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { CONSTANTS } from '../app.constants';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { taskModel } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getTasks() {
    return this.http.post(`${CONSTANTS.endpoint}/tasks`, { token: this.authService.userToken }).pipe(
      catchError(this.handlerErrorToken)
    );
  }

  createTask(task: taskModel) {
    const taskData = { ...task, token: this.authService.userToken };
    return this.http.post(`${CONSTANTS.endpoint}/createTask`, taskData).pipe(
      catchError(this.handlerErrorToken)
    );
  }

  deleteTask(id: string) {
    return this.http.post(`${CONSTANTS.endpoint}/deleteTasks/${id}`, { token: this.authService.userToken }).pipe(
      catchError(this.handlerErrorToken)
    );
  }

  updateTask(task: taskModel, id: string) {
    const taskData = { ...task, token: this.authService.userToken };
    return this.http.put(`${CONSTANTS.endpoint}/updateTask/${id}`, taskData).pipe(
      catchError(this.handlerErrorToken)
    );
  }

  handlerErrorToken(error: any) {
    if (error.status === 401) {
      this.authService.logOut();
    }

    return of(error);
  }

}
