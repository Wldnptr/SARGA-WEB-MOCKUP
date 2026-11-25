import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { CatalogComponent } from './features/catalog/catalog.component';
import { ItemDetailComponent } from './features/catalog/item-detail.component';
import { LoginComponent } from './features/auth/login.component';
import { RegisterComponent } from './features/auth/register.component';
import { ItemCreateComponent } from './features/items/item-create.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'beranda',
    component: HomeComponent
  },
  {
    path: 'katalog/:id',
    component: ItemDetailComponent
  },
  {
    path: 'katalog',
    component: CatalogComponent
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'login',
    redirectTo: 'auth/login'
  },
  {
    path: 'auth/register',
    component: RegisterComponent
  },
  {
    path: 'daftar',
    redirectTo: 'auth/register'
  },
  {
    path: 'status-akun',
    loadComponent: () =>
      import('./features/auth/status-akun.component').then(m => m.StatusAkunComponent)
  },
  {
    path: 'auth/status-akun',
    redirectTo: 'status-akun'
  },
  {
    path: 'gabung',
    loadComponent: () =>
      import('./features/auth/gabung.component').then(m => m.GabungComponent)
  },
  {
    path: 'auth/gabung',
    redirectTo: 'gabung'
  },
  {
    path: 'barang/tambah',
    component: ItemCreateComponent,
    canActivate: [authGuard]
  },
  {
    path: 'tambah-barang',
    redirectTo: 'barang/tambah'
  },
  {
    path: 'form-pengajuan',
    loadComponent: () =>
      import('./features/loans/loan-request.component').then(m => m.LoanRequestComponent)
  },
  {
    path: 'pinjaman-saya',
    loadComponent: () =>
      import('./features/loans/my-loans.component').then(m => m.MyLoansComponent)
  },
  {
    path: 'barang-saya',
    loadComponent: () =>
      import('./features/items/my-items.component').then(m => m.MyItemsComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
