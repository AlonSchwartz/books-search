import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private http: HttpClient) { }

  booksData: any;
  query = '';

  readonly URL = 'https://www.googleapis.com/books/v1/volumes?q=';
  readonly QUERY_PARAMS = '&maxResults=10&printType=books'; //In order to get 10 results of books only

  ngOnInit(): void {
  }

  /**
   * forcing the scroller to go back to top on new search
   */
  scrollToTop() {
    let resultsDiv = document.getElementById('results');
    if (resultsDiv?.scrollHeight && resultsDiv?.scrollHeight > 0) {
      resultsDiv?.scrollTo({ top: 0 });
    }
  }

  search() {
    //close keyboard on mobile
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    //In case enter was clicked without inserting any chars - do nothing 
    if (this.query == '') {
      return;
    }
    this.scrollToTop();

    if (this.query.trim().length == 0) { //In case the string is just spaces
      this.booksData = { totalItems: 0 }
    }
    else {
      this.showSpinner()
      this.http.get<any>(this.URL + this.query + this.QUERY_PARAMS).subscribe(data => {
        this.hideSpinner()
        this.booksData = data;
      })
    }
  }

  hideSpinner() {
    let spinner = document.getElementById('loading');
    if (spinner) {
      spinner.style.display = 'none';
    }
  }
  showSpinner() {
    let spinner = document.getElementById('loading');
    if (spinner) {
      spinner.style.display = 'block';
    }
  }
}
