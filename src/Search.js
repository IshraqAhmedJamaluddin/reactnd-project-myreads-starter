import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class Search extends Component {

    state={
        query: "",
        books: []
    }

    oldBooks = []
    newBooks = []

    queryChange = (event) => {
        event.preventDefault()
        this.setState({query: event.target.value}, () => {
            if (this.state.query) {
                BooksAPI.getAll()
                .then((books) => {
                    this.oldBooks = books
                })
                BooksAPI.search(this.state.query.trim())
                .then((books) => {
                    if (books.length) {
                        this.newBooks = []
                        books.forEach((book) => {
                            let isFound = false
                            this.oldBooks.forEach((b) => {
                                if (book.id === b.id) {
                                    this.newBooks.push(b)
                                    isFound = true
                                }
                            })
                            if (!isFound) {
                                this.newBooks.push(book)
                            }
                        });
                        console.log(this.newBooks)
                        this.setState({books: this.newBooks})
                    } else {
                        this.setState({books: []})
                    }
                })
                .catch(error => console.log(error))
            } else {
                this.setState({books: []})
            }
    }) }

    render () {
        return (
            <div className="search-books">
              <div className="search-books-bar">
                <Link
                  to='/'
                  className="close-search">Close</Link>
                <div className="search-books-input-wrapper">
                  <input vlaue={this.state.query} onChange={this.queryChange} type="text" placeholder="Search by title or author"/>
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                    {this.state.books.filter((book) => book.title && book.authors && book.imageLinks).map((book) => (
                        <li key={book.id}>
                            <Book updateShelf={this.props.updateShelf} book={book} />
                        </li>
                    ))}
                </ol>
              </div>
            </div>
        )
    }
}

export default Search