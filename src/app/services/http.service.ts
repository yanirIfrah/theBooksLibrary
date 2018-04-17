import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { Response } from '@angular/http/src/static_response';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommentStmt } from '@angular/compiler/src/output/output_ast';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) { }

  //works
  private books: any = [];
  allBooksApiRoot = 'http://localhost:3000/books/';
  getAllBooks(): Observable<any> {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");
    return this.http.get(this.allBooksApiRoot, { headers });
  }
  //works
  updateBook(bookObj) {
    if (bookObj.id < 0) {
      return void [0];
    }
    console.log("bookObj ", bookObj);
    let url = 'http://localhost:3000/books/' + bookObj.id;
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");
    return this.http.put(url, bookObj, { headers });
  }
  //works
  deleteBookApiRoot = 'http://localhost:3000/books/';
  deleteBook(book) {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
    return this.http.delete(this.deleteBookApiRoot + book.id, { headers });
  }
  //works
  addBookApiRoot = 'http://localhost:3000/books';
  addBook(book) {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
    return this.http.post(this.addBookApiRoot, book, { headers });
  }



}
