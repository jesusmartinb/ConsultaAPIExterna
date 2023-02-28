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

  getUsersByPage(page: number, total_pages: number, limit: number, offset: number): Observable<any> {
    return this.httpClient.get<any>(this.url, { params: { page, total_pages, limit, offset } });
  }

  getUserById(id: string): Observable<any> {
    return this.httpClient.get<any>(this.url + '/' + id);
  }

  createNewUser(newUser: Usuario): Observable<any> {
    return this.httpClient.post<any>(this.url, newUser);
  }

  updateUser(id: string): Observable<any> {
    return this.httpClient.put<any>(this.url + '/' + id, id);
  }
}
