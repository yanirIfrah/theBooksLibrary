import { Component, OnInit, Pipe } from '@angular/core';
import { HttpService } from './../../services/http.service';
import { NgModule } from '@angular/core';
import { PipeTransform } from '@angular/core/src/change_detection/pipe_transform';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.scss']
})
export class UpdateBookComponent implements OnInit {
  allBooks: any = [];
  bookObj: any = {};
  pageTitle: string;
  id: number;
  author: string = '';
  date: string = '';
  title: string = '';
  errorMessage: string;
  myForm: FormGroup;
  isAlreadyExist: boolean = false;
  updatedBook: any = {};

  constructor(private fb: FormBuilder, private httpService: HttpService) { }

  //get all books from the json file
  getAllBooks() {
    this.httpService.getAllBooks()
      .subscribe(
      data => { this.allBooks = data },
      (err) => { console.log(err) })
    return this.allBooks || [];
  }
  // checking if the book title id already and display a message to the user
  checkIfTitleExist(Text) {
    let newTitle = Text;//check
    if (typeof newTitle !== 'string' || !newTitle || /^\s*$/.test(newTitle)) {
      this.isAlreadyExist = false;
      return void [0];
    }
    this.allBooks.map(book => {
      if (typeof book.title === 'string') {
        if (book.title === newTitle) {
          this.isAlreadyExist = true;
          return;
        }
      }
    });
  }
  openUpdateModal(book: any) {
    this.updatedBook = book;
  }
  // update book on json file
  updateBook() {
    let isAlreadyExist = false;
    let titleToCheck = this.title.trim();
    if (typeof this.updatedBook.title !== 'string' || !this.updatedBook.title || /^\s*$/.test(this.updatedBook.title)) {
      return void [0];
    }
    this.allBooks.map(book => {
      if (typeof book.title === 'string') {
        if (book.title === titleToCheck) {
          isAlreadyExist = true;
          return;
        }
      }
    });
    if (!isAlreadyExist) {// if title not exist
      this.errorMessage = '';
      this.bookObj.id = this.updatedBook.id;
      this.bookObj.author = this.author;
      this.bookObj.date = this.date;
      this.bookObj.title = this.title;
      this.httpService.updateBook(this.bookObj)
        .subscribe(
        res => { this.bookObj = res },
        err => { console.log(err) })
      this.onSubmit();
      this.getAllBooks();
    }
    else {
      this.errorMessage = 'Title Is Already Exist, Please Try New Title !';
      console.error(this.errorMessage);
    }
  }
  onSubmit() {
    if (this.myForm.valid) {
      this.myForm.reset();
    }
  }
  // reset inputs filed after submit the form
  ngOnInit() {
    let bookId = this.bookObj.id;
    this.isAlreadyExist = false;
    this.pageTitle = 'Update Books';
    this.getAllBooks();
    this.myForm = this.fb.group({
      id: new FormControl({ bookId }),
      author: new FormControl(['', Validators.required]),
      date: new FormControl(['', Validators.required]),
      title: new FormControl(['', Validators.required])
    });
  }
}

