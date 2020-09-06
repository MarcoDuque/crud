import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import Swal from 'sweetalert2';

import { AuthService } from 'src/app/services/auth.service';
import { TasksService } from 'src/app/services/tasks.service';
import { taskModel } from 'src/app/models/task.model';
import { AddTasksComponent } from '../add-tasks/add-tasks.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tasks: taskModel[] = [];
  loading: boolean;
  date = new Date();

  constructor(private auth: AuthService, private task: TasksService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loading = true;
    this.getTask();
  }

  closeSession() {
    this.auth.logOut();
  }

  getTask() {
    this.task.getTasks().subscribe(resp => {
      this.tasks = resp.myTasks;
      this.tasks.map((task) => {
        const days = this.diffDays(new Date(task.dueDate), this.date);
        task.warning = days < 5;
      });
      this.loading = false;
    });
  }

  openModal(dataTask = null) {
    this.dialog.open(AddTasksComponent, {
      data: { id: dataTask },
    }).afterClosed().subscribe({
      next: (result) => {
        if (result) this.getTask();
      }
    });
  }

  deleteTask(id: string) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'Estas seguro de borrar la tarea',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value) {
        this.task.deleteTask(id).subscribe(resp => {
          this.getTask();
        }, err => {
          console.error(err);
        });
      }
    });
  }

  diffDays(date1: Date, date2: Date) {
    const diff = date1.getTime() - date2.getTime();
    return Math.ceil(diff / (1000 * 3600 * 24));
  }
}
