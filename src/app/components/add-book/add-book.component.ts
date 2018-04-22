import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../services/http.service';
import { NgModule } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  allBooks: any = [];
  bookObj: any = {};
  pageTitle: string; 
  id: number;
  author: string = '';
  date: string = '';
  title: string = '';
  myForm: FormGroup;
  errorMessage: string;
  isAlreadyExist: boolean = false;

  constructor(private fb: FormBuilder, private httpService: HttpService) { }

  //get all books from the json file
  getAllBooks() {
    this.httpService.getAllBooks().subscribe(
      data => { this.allBooks = data },
      (err) => { console.log(err) })
    return this.allBooks || [];
  }
  // checking if the book title id already and display a message to the user
  checkIfTitleExist(Text) {
    let newTtile = Text;//check
    newTtile = newTtile;
    if (typeof newTtile !== 'string' || !newTtile || /^\s*$/.test(newTtile)) {
      this.isAlreadyExist = false;
      return void [0];
    }
    this.allBooks.map(book => {
      if (typeof book.title === 'string') {
        if (book.title === newTtile) {
          this.isAlreadyExist = true;
          return;
        }
      }
    });
  }
  // add new book to json file
  addBook() {
    let isAlreadyExist = false;
    let titleToCheck = this.title.trim();
    if (typeof this.title !== 'string' || !this.title || /^\s*$/.test(this.title)) {
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
      this.bookObj.id = this.id;
      this.bookObj.author = this.author;
      this.bookObj.date = this.date;
      this.bookObj.title = this.title;
      this.httpService.addBook(this.bookObj).subscribe(
        data => { this.bookObj = data },
        err => { console.log(err) })
      this.onSubmit();
      this.getAllBooks();
    }
    else {
      this.errorMessage = 'Title Is Already Exist, Please Try New Title !';
      console.error(this.errorMessage);
    }
  }

  // reset inputs filed after submit the form
  onSubmit() {
    if (this.myForm.valid) {
      this.myForm.reset();
    }
  }
  ngOnInit() {
    this.isAlreadyExist = false;
    this.pageTitle = "Add Books";
    this.getAllBooks();
    this.myForm = this.fb.group({
      id: new FormControl(['', Validators.required]),
      author: new FormControl(['', Validators.required]),
      date: new FormControl(['', Validators.required]),
      title: new FormControl(['', Validators.required]),
    });
  }
}
