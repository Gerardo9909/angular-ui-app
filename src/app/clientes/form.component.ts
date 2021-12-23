import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})

export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  public titulo: string = "Crear cliente";

  constructor(private clienteService: ClienteService,
  private router: Router,
  private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente();
  }

  public cargarCliente(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if(id!=null){
        this.clienteService.getCliente(id).subscribe((cliente) => this.cliente = cliente);
      }
    });
  }

  public createCliente(): void{
    this.clienteService.createCliente(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes'])
        Swal.fire({
          title: 'Cliente Nuevo',
          text: `Cliente ${cliente.nombre} creado con exito`,
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      }  
    );
  }

  public updateCliente(): void{
    this.clienteService.updateCliente(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes'])
        Swal.fire({
          title: 'Cliente Actualizado',
          text: `Cliente ${cliente.nombre} actualizado con exito`,
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      }
    )
  }
}
