import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { EspecimenListComponent } from './app/components/especimen-list/especimen-list.component';
import { EspecimenFormComponent } from './app/components/especimen-form/especimen-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/lista', pathMatch: 'full' },
  { path: 'lista', component: EspecimenListComponent },
  { path: 'nuevo', component: EspecimenFormComponent }
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-100">
      <nav class="bg-white shadow-lg">
        <div class="container mx-auto px-4">
          <div class="flex justify-between h-16">
            <div class="flex">
              <div class="flex-shrink-0 flex items-center">
                <h1 class="text-xl font-bold">Herbario UQ</h1>
              </div>
              <div class="ml-6 flex space-x-8">
                <a routerLink="/lista" 
                   class="inline-flex items-center px-1 pt-1 text-gray-900">
                  Lista de Especímenes
                </a>
                <a routerLink="/nuevo" 
                   class="inline-flex items-center px-1 pt-1 text-gray-900">
                  Nuevo Espécimen
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class App {}

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    RouterModule.forRoot(routes).providers!
  ]
});