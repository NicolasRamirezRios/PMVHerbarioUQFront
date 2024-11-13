import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {

  private cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dkm9g0zpt/image/upload'; // Reemplaza con tu cloud_name

  constructor(private http: HttpClient) {}

  uploadPhotoToCloudinary(photo: File, correo: string): Observable<string> {
    const cloudinaryData = new FormData();
    cloudinaryData.append('file', photo);
    cloudinaryData.append('public_id', correo);
    cloudinaryData.append('upload_preset', 'ml_default');
    cloudinaryData.append('cloud_name', 'dkm9g0zpt'); // Reemplaza con tu cloud_name
    cloudinaryData.append('api_key', '654495213436479'); // Reemplaza con tu api_key
    cloudinaryData.append('api_secret', 'PIJO3ukm6rEsZFGjOIK7gcVDV-g'); // Reemplaza con tu api_secret

    return this.http.post<any>(this.cloudinaryUrl, cloudinaryData).pipe(
      map(response => response.secure_url),
      catchError(error => {
        console.error('Error al cargar la foto en Cloudinary', error);
        return throwError('Error al cargar la foto en Cloudinary');
      })
    );
  }
}