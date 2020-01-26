import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppService } from './app.service';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatIconModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatSelectModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SettleUpComponent } from './components/settle-up/settle-up.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ExpensesComponent } from './components/expenses/expenses.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SettleUpComponent,
    HeaderComponent,
    ExpensesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatSelectModule,
    ToastrModule.forRoot()
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
