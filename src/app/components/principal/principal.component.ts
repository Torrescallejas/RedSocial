import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData, deleteDoc, doc, query } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import Blog from 'src/app/interfaces/blog.interface';
import { FunctionsService } from 'src/app/services/functions.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  UID:any;
  form:Object = {id:String, descripcion:String, fecha:String};
  dataPublicaciones: Array<any> = [];

  constructor(private userserivce:UserService, 
    private functions:FunctionsService,
    private firebase:Firestore) { 

    }

  async ngOnInit() {
    this.UID = await this.getUID();
    this.functions.getPublicaciones().subscribe(publicaciones => {
      this.dataPublicaciones = publicaciones
    })
  }

  async onSubmit(f: any) {
    this.form = {
      id: await this.getUID(),
      descripcion: f.value['descripcion'],
      fecha: Date()
    }
    // console.log(this.form);
    const response = await this.functions.addPublicacion(this.form);
    // console.log(response);
  }

  eliminarPublicacion(id: string) {
    this.functions.deletePublicacion(id);
  }

  async getUID() {
    return await this.userserivce.obtenerUID();
  }


}
