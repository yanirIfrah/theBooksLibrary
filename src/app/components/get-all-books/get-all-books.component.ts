import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../services/http.service';


@Component({
  selector: 'app-get-all-books',
  templateUrl: './get-all-books.component.html',
  styleUrls: ['./get-all-books.component.scss'],
})
export class GetAllBooksComponent implements OnInit {
  allBooks: any = [];
  title: string;

  constructor(private httpService: HttpService) { }

  getAllBooks() {
    this.httpService.getAllBooks()
      .subscribe(
      data => { this.allBooks = data },
      (err) => { console.log(err) })
    return this.allBooks || [];
  }
  ngOnInit() {
    this.title = 'All Books';
    this.getAllBooks();
  }

} 
