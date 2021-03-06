import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import propTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class Search extends Component {

  static propTypes = {
    books: propTypes.array.isRequired,
    changeShelf: propTypes.func.isRequired
  }

  state = {
    searchResults: []
  }

  searchBooks = (text) => {
    if(text) {
      BooksAPI.search(text)
        .then((resp) => {
          this.setState({
            searchResults: resp
          })
        })
        .catch((e) => {
          console.error(e)
        })
    }
    else {
      this.setState({searchResults: []})
    }
  }

  render() {
    let { searchResults } = this.state
    let { books, changeShelf } = this.props

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input 
              type="text" placeholder="Search by title or author"
              onChange={(event) => {this.searchBooks(event.target.value)}}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {((searchResults !== undefined) && (searchResults.length >0 )) ? (
              searchResults.map(book => {
                let presetSelectMenuValue = "none"

                //check if book is already on a shelf.
                //if so, assign shelf value its existing shelf value.
                books.forEach((item) => {
                  if(item.id === book.id) {
                    presetSelectMenuValue = item.shelf;
                  }
                })

                return (
                  <li key={book.id}>
                    <Book
                      book={book}
                      presetSelectMenuValue={presetSelectMenuValue}
                      changeShelf={changeShelf}
                    />
                  </li>
                )})
              ) : (
                <h2>Type in Search Bar to See Books</h2>
              )}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search