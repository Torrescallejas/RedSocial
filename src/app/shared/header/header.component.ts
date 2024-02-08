import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EmitterService } from 'src/app/services/emitter.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  user: any;
  estado:Boolean = false;

  constructor(private router:Router, private userService:UserService, private emitter:EmitterService){}
  
  
  async ngOnInit() {
    this.user = this.userService.obtenerUID();
    this.emitter.estados.subscribe(estado => {
      console.log(estado);
      this.estado=estado;
    });
  }

  home() {
    this.router.navigate(['/'])
  }

  logOut(){
    this.userService.logOut()
      .then(() => {
        console.log('Sesion Cerrada');
        this.router.navigate(['/home'])
      })
      .catch(err => console.log(err))
  }

}
