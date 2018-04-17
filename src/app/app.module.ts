import { HttpService } from './services/http.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Http } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { GetAllBooksComponent } from './components/get-all-books/get-all-books.component';
import { UpdateBookComponent } from './components/update-book/update-book.component';
import { HomeComponent } from './components/home/home.component';
import { DeleteBookComponent } from './components/delete-book/delete-book.component';
import { NonEnglishPipe } from './pipes/non-english.pipe';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { ShowBookComponent } from './components/show-book/show-book.component';
import { FeatureComponent } from './components/feature/feature.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'getallbooks', component: GetAllBooksComponent },
  { path: 'updatebook', component: UpdateBookComponent },
  { path: 'addbook', component: AddBookComponent },
  { path: 'deletebook', component: DeleteBookComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    AddBookComponent,
    GetAllBooksComponent,
    UpdateBookComponent,
    HomeComponent,
    DeleteBookComponent,
    NonEnglishPipe,
    PageHeaderComponent,
    ShowBookComponent,
    FeatureComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    MDBBootstrapModule.forRoot()
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [HttpService, NonEnglishPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
