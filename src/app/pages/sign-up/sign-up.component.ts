import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { userModel } from 'src/app/models/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user: userModel = new userModel();
  rememberUser = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void { }

  onSubmit(form: NgForm) {

    if (form.invalid) { return; }

    Swal.fire({
      allowOutsideClick: false,
      text: 'Espere por favor',
      icon: 'info'
    });
    Swal.showLoading();

    this.auth.signUp(this.user)
      .subscribe(res => {
        Swal.close();

        if (this.rememberUser) {
          localStorage.setItem('email', this.user.email);
        }

        this.router.navigateByUrl('/signin')
      }, (err) => {
        Swal.fire({
          allowOutsideClick: true,
          text: err.error.err.message,
          icon: 'error'
        });
      })
  }

}
