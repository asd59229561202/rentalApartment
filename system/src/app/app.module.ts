import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { routes } from './app-routing.module';
import { searchBarComponent } from './components/partials/navbar/searchBar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TreeSelectModule } from 'primeng/treeselect';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MultiSelectModule } from 'primeng/multiselect';
import { RentalItemComponent } from './components/partials/rental-item/rental-item.component';
import { RentComponent } from './components/pages/rent/rent.component';
import { MessageService } from 'primeng/api';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { RentalInfoComponent } from './components/pages/rental-info/rental-info.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ReserveComponent } from './components/partials/reserve/reserve.component';
import { DialogModule } from 'primeng/dialog';
import { RentalItemResultComponent } from './components/partials/rental-item-result/rental-item-result.component';
import { SplitButtonModule } from 'primeng/splitbutton';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    searchBarComponent,
    RentalItemComponent,
    RentComponent,
    LoginComponent,
    RegisterComponent,
    RentalInfoComponent,
    ReserveComponent,
    RentalItemResultComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    TreeSelectModule,
    BrowserAnimationsModule,
    MultiSelectModule,
    ButtonModule,
    HttpClientModule,
    SlickCarouselModule,
    DialogModule,
    SplitButtonModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
