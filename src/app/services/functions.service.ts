import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, deleteDoc, doc } from '@angular/fire/firestore';
import Blog from '../interfaces/blog.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor(private firestore:Firestore) { }

  addPublicacion(publicacion:Object) {
    const blogRef = collection(this.firestore, 'publicacion');
    return addDoc(blogRef, publicacion);
  }

  getPublicaciones(): Observable<any[]> {
    const blogRef = collection(this.firestore, 'publicacion');
    return collectionData(blogRef, {idField: 'idCollection'}) as Observable<any[]>;
  }

  deletePublicacion(id: string) {
    const docInstance = doc(this.firestore, 'publicacion', id);
    deleteDoc(docInstance)
      .then(() => {
        console.log('Publicacion Eliminada');
      })
      .catch((err) => {
        console.log(err);
      })
  }

}
