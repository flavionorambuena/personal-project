import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list.component';
import { MealRegisterComponent } from './meal-register.component';

const routes: Routes = [
  { path: '', component: MealRegisterComponent },
  { path: 'products', component: ProductListComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    AppComponent,
    ProductListComponent,
    MealRegisterComponent,
    RouterModule.forRoot(routes),
    HttpClientModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
