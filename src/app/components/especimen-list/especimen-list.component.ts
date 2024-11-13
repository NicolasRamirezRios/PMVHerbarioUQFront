import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EspecimenService } from '../../services/especimen.service';
import { Especimen } from '../../models/especimen.model';

@Component({
  selector: 'app-especimen-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './especimen-list.component.html',
})
export class EspecimenListComponent implements OnInit {
  especimenes: Especimen[] = [];

  constructor(private especimenService: EspecimenService) {}

  ngOnInit(): void {
    this.especimenService.getEspecimenes().subscribe((data) => {
      this.especimenes = data;
    });
  }

  loadEspecimenes(): void {
    this.especimenService.getEspecimenes()
      .subscribe({
        next: (data) => {
          console.log('Datos recibidos:', data); // Verificar datos en la consola
          this.especimenes = data;
        },
        error: (err) => console.error('Error al cargar especímenes:', err)
      });
  }
  

  deleteEspecimen(id: number): void {
    if (confirm('¿Está seguro de eliminar este espécimen?')) {
      this.especimenService.deleteEspecimen(id)
        .subscribe(() => this.loadEspecimenes());
    }
  }
}