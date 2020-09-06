import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { userModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  user: userModel = new userModel();
  rememberUser = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('email')) {
      this.user.email = localStorage.getItem('email');
    }
  }

  login(form: NgForm) {

    if (form.invalid) { return; }

    Swal.fire({
      allowOutsideClick: false,
      text: 'Espere por favor',
      icon: 'info'
    });
    Swal.showLoading();

    this.auth.signIn(this.user)
      .subscribe(resp => {
        Swal.close();

        if (this.rememberUser) {
          localStorage.setItem('email', this.user.email);
        }

        this.router.navigateByUrl('/home')
      }, err => {
        Swal.fire({
          allowOutsideClick: true,
          text: err.error.err.message,
          icon: 'error'
        });
      });
  }

}
