import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2'
import { Observable } from 'rxjs';
import { TasksService } from 'src/app/services/tasks.service';
import { taskModel } from '../../models/task.model'

@Component({
  selector: 'app-add-tasks',
  templateUrl: './add-tasks.component.html',
  styleUrls: ['./add-tasks.component.css']
})
export class AddTasksComponent implements OnInit {

  task = new taskModel();

  constructor(
    public dialogRef: MatDialogRef<AddTasksComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskService: TasksService,
  ) {}

  ngOnInit() {
    if (this.data.id !== null) {
      this.task.tittle = this.data.id.tittle
      this.task.taskPriority = this.data.id.taskPriority;
      this.task.dueDate = this.data.id.dueDate;
      this.task.id = this.data.id._id;
    }
  }

  close() {
    this.dialogRef.close(false);
  }

  saveTask(form: NgForm) {

    if (this.data.id !== null) {

      return this.taskService.updateTask(this.task, this.task.id)
        .subscribe(res => {
          this.dialogRef.close(true);
        }, err => {
          console.error(err)
        });

    }

    if (form.invalid) { return };

    Swal.fire({
      title: 'Espere',
      text: 'Guardando Informacion',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    this.taskService.createTask(this.task).subscribe(res => {
      Swal.fire({
        title: this.task.tittle,
        text: 'Se guardo correctamente',
        icon: 'success'
      });

      this.dialogRef.close(true);
    }, err => {
      Swal.fire({
        allowOutsideClick: true,
        text: 'No se pudo guardar la tarea',
        icon: 'error'
      });
    });
  }


}
