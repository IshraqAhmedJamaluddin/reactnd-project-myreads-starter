import React from 'react'
import { Route, Link } from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'
import Search from './Search'

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
          <Search updateShelf={this.updateShelf} />
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
