import { Component, OnInit } from '@angular/core';
import { Usuario } from './Models/usuario.interface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
title(title: any) {
  throw new Error('Method not implemented.');
}
  
usuarios: Usuario[] = [];
nuevoUsuario: Usuario = {nombre: '', email: '', empresa: ''}
constructor(private http: HttpClient){}
ngOnInit(): void {
this.obtenerUsuario()
}
obtenerUsuario(){

  this.http.get<any[]>('https://jsonplaceholder.typicode.com/users').subscribe(data=>{
    this.usuarios = data.map(user => ({
      nombre: user.name,
      email: user.email,
      empresa: user.company.name
    }));
  });
}
agregarUsuario(){
 const body ={
  name:this.nuevoUsuario.nombre,
  email: this.nuevoUsuario.email,
  company: {
    name: this.nuevoUsuario.empresa,
   }
  };
  this.http.post('https://jsonplaceholder.typicode.com/users', body).subscribe(Response=>{
    console.log('Usuario Agregado',Response);
    this.usuarios.push(this.nuevoUsuario);
    this.nuevoUsuario={nombre: '', email:'', empresa:''}
  })
}

}