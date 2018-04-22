import { HttpService } from './../../services/http.service';
import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.scss']
})
export class DeleteBookComponent implements OnInit {
  allBooks: any = [];
  bookObj: any = {};
  deletedBook: any = {};
  pageTitle: string;
  id: number;
  author: string = '';
  date: string = '';
  title: string = '';
  myForm: FormGroup;

  constructor(private fb: FormBuilder, private httpService: HttpService) { }

  getAllBooks() {
    this.httpService.getAllBooks().subscribe(
      data => { this.allBooks = data },
      (err) => { console.log(err) })
    return this.allBooks || [];
  }

  openDeleteModal(book: any) {
    this.deletedBook = book;
  }
  // delete book on json file
  deleteBook() {
    this.bookObj.id = this.deletedBook.id;
    console.log("bookObj :", this.bookObj.id)
    console.log("deletedBook: ", this.deletedBook)
    console.log("deletedBook id : ", this.deletedBook.id)
    this.httpService.deleteBook(this.bookObj).subscribe(
      date => { this.bookObj = date },
      err => { console.log(err) })
    this.getAllBooks();
  }

  onSubmit() {
    if (this.myForm.valid) {
      console.log("Form Submitted!");
      this.myForm.reset();
    }
  }

  ngOnInit() {
    this.pageTitle = "Delete Books";
    this.getAllBooks();
    this.myForm = this.fb.group({
      id: new FormControl(['', Validators.required])
    });
  }

}
