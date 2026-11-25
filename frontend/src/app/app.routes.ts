import { Routes } from '@angular/router';
import { CatalogComponent } from './features/catalog/catalog.component';
import { ItemDetailComponent } from './features/catalog/item-detail.component';
import { LoginComponent } from './features/auth/login.component';
import { RegisterComponent } from './features/auth/register.component';
import { ItemCreateComponent } from './features/items/item-create.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: CatalogComponent
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
    path: 'auth/register',
    component: RegisterComponent
  },
  {
    path: 'barang/tambah',
    component: ItemCreateComponent,
    canActivate: [authGuard]
  },
  {
    path: 'edit-barang/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/items/item-edit.component').then(m => m.ItemEditComponent)
  },
  {
    path: 'edit-barang',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/items/item-edit.component').then(m => m.ItemEditComponent)
  },
  {
    path: 'admin-monitoring',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/admin/monitoring.component').then(m => m.MonitoringComponent)
  },
  {
    path: 'admin-verifikasi',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/admin/verification.component').then(m => m.VerificationComponent)
  },
  {
    path: 'admin-anggota',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/admin/members.component').then(m => m.MembersComponent)
  },
  {
    path: 'admin-tambah-anggota',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/admin/member-add.component').then(m => m.MemberAddComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
