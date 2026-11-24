import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { CatalogComponent } from './features/catalog/catalog.component';
import { ItemDetailComponent } from './features/catalog/item-detail.component';
import { LoginComponent } from './features/auth/login.component';
import { RegisterComponent } from './features/auth/register.component';
import { StatusAkunComponent } from './features/auth/status-akun.component';
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
    component: StatusAkunComponent
  },
  {
    path: 'auth/status-akun',
    redirectTo: 'status-akun'
  },
  {
    path: 'barang/tambah',
    component: ItemCreateComponent,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
