import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { RentComponent } from './components/pages/rent/rent.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { RentalInfoComponent } from './components/pages/rental-info/rental-info.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'rent', component: RentComponent },
  { path: 'rent/:result', component: RentComponent },
  { path: 'login/:type', component: LoginComponent },
  { path: 'rental-info/:id', component: RentalInfoComponent },
  { path: 'register/:type', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
