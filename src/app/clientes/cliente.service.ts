import { Injectable } from '@angular/core';
// import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class ClienteService {

  private urlEndPoint:string = 'http://localhost:8080/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

  constructor(private http: HttpClient, private router: Router) { }

  getClientes(page: number): Observable<any> {
    // return of(CLIENTES);
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      map( (response: any) => {
      (response.content as Cliente[]).map(cliente => {
          cliente.createAt = formatDate(cliente.createAt, 'EEEE dd, MMM yyyy', 'es-MX');
          cliente.fechaNac = formatDate(cliente.fechaNac, 'EEEE dd, MMM yyyy', 'es-MX');
          return cliente;
        });

        return response;
      })
    );
  }

  createCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        Swal.fire({
          title: 'Error',
          text: `Error al crear: ${e.error.message}`,
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        return throwError(() => e);
      })
    );
  }

  updateCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        Swal.fire({
          title: 'Error',
          text: `Error al actualizar: ${e.error.message}`,
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        return throwError(() => e);
      })
    );
  }

  getCliente(id:number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        Swal.fire({
          title: 'Error',
          text: `Error al editar: ${e.error.message}`,
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        return throwError(() => e);
      })
    );
  }

  deleteCliente(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers : this.httpHeaders}).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        Swal.fire({
          title: 'Error',
          text: `Error al eliminar: ${e.error.message}`,
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        return throwError(() => e);
      })
    );
  }
}
