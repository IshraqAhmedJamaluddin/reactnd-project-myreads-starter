import React from 'react'
import { Route, Link } from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    books: [],
    currentlyReading: [],
    wantToRead: [],
    read: []
  }
  
  componentDidMount() {
    BooksAPI.getAll()
    .then(books => { this.books = books })
    .then(()=>{
      this.setState({
        currentlyReading: this.books.filter((book) => book.shelf === 'currentlyReading'),
        wantToRead: this.books.filter((book) => book.shelf === 'wantToRead'),
        read: this.books.filter((book) => book.shelf === 'read')
      })
    })
  }
  updateShelf(book, shelf) {
    BooksAPI.update(book, shelf)
    .then(books => window.location.reload())
  }

  render() {
    return (
      <div className="app">
        <Route path="/search">
          <div className="search-books">
            <div className="search-books-bar">
              <Link
                to='/'
                className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        </Route>

        <Route exact path="/">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf updateShelf={this.updateShelf} title='Currently Reading' books={this.state.currentlyReading}/>
                <BookShelf updateShelf={this.updateShelf} title='Want to Read' books={this.state.wantToRead}/>
                <BookShelf updateShelf={this.updateShelf} title='Read' books={this.state.read}/>
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        </Route>

      </div>
    )
  }
}

export default BooksApp
