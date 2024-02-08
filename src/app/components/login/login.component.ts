import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmitterService } from 'src/app/services/emitter.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  estado:Boolean =true;

  constructor(private router: Router, private userService: UserService, private emitter:EmitterService) {

  }

  onSubmit(f:any) {
    console.log(f.value);
    this.userService.login(f.value)
      .then(response => {
        console.log('Inicio de Sesión Exitoso');
        console.log(response);
        this.emitter.changeBool(this.estado)
        this.router.navigate(['/blog']);
      })
      .catch(err => console.log(err));
    
  }

  onClick() {
    this.userService.loginWithGoogle()
      .then(response => {
        console.log(response)
        this.router.navigate(['/blog'])
      })
      .catch(err => console.log(err))
  }

  registrar() {
    this.router.navigate(['/register']);
  }
}
