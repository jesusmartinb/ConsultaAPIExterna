import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private arrUsuarios: Usuario[] = [];

   private url: string = 'https://peticiones.online/api/users'

  constructor(private httpClient: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.httpClient.get<any>(this.url);
  }

  getUserById(id: string): Observable<any> {
    return this.httpClient.get<any>(this.url + '/' + id);
  }

  createNewUser(newUser: Usuario): Observable<any> {
    return this.httpClient.post<any>(this.url, newUser);
  }
}


