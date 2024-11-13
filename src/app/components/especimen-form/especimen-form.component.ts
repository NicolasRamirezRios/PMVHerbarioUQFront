import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { EspecimenService } from '../../services/especimen.service';
import { CloudinaryService } from '../../services/cloudinary.service';
import { Especimen } from '../../models/especimen.model';

@Component({
  selector: 'app-especimen-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './especimen-form.component.html',
})
export class EspecimenFormComponent {
  selectedFile: File | null = null;
  especimen: Especimen = {
    id: 0,
    nombreCientifico: '',
    recolector: '',
    lugarRecolecta: '',
    fechaRecolecta: '',
    detallesEcologicos: '',
    linkFoto: ''
  };

  constructor(
    private especimenService: EspecimenService,
    private cloudinaryService: CloudinaryService,
    private http: HttpClient
  ) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    this.especimenService.createEspecimen(this.especimen)
      .subscribe({
        next: (createdEspecimen) => {
          if (this.selectedFile && createdEspecimen.id !== undefined) {
            this.cloudinaryService.uploadPhotoToCloudinary(this.selectedFile, createdEspecimen.id.toString())
              .subscribe({
                next: (photoUrl) => {
                  this.especimen.linkFoto = photoUrl;
                  this.especimenService.updateEspecimen(createdEspecimen.id!, this.especimen).subscribe(() => {
                    alert('Espécimen y foto guardados exitosamente');
                    this.resetForm();
                  });
                },
                error: (error) => {
                  console.error('Error al subir la foto:', error);
                  alert('Error al subir la foto del espécimen');
                }
              });
          } else {
            alert('Espécimen guardado exitosamente');
            this.resetForm();
          }
        },
        error: (error) => {
          console.error('Error al guardar:', error);
          alert('Error al guardar el espécimen');
        }
      });
  }

  private resetForm(): void {
    this.especimen = {
      id: 0,
      nombreCientifico: '',
      recolector: '',
      lugarRecolecta: '',
      fechaRecolecta: '',
      detallesEcologicos: '',
      linkFoto: ''
    };
    this.selectedFile = null;
  }
}