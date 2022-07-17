import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent implements OnInit {

  constructor() { }
  readonly NO_COVER_URL = 'https://books.google.co.il/googlebooks/images/no_cover_thumb.gif'
  @Input() book?: any;

  ngOnInit(): void {
    if (this.book) {
      if (!this.book.volumeInfo.description) {
        this.book.volumeInfo.description = "No Description";
      }
      // If there are no cover photo, use google's default no-cover photo
      if (!this.book.volumeInfo.imageLinks) {
        this.book.volumeInfo.imageLinks = { thumbnail: this.NO_COVER_URL };
      }
      // If there are no thumbnail, take small thumbnail instead
      if (!this.book.volumeInfo.imageLinks.thumbnail) {
        this.book.volumeInfo.imageLinks.thumbnail = this.book.volumeInfo.imageLinks.smallThumbnail;
      }
    }
  }

}
