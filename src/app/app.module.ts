import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ConversionComponent } from './conversion/conversion.component';
import { SelectComponent } from './UI/select/select.component';
import { MyInputComponent } from './UI/my-input/my-input.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ConversionComponent,
    SelectComponent,
    MyInputComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
