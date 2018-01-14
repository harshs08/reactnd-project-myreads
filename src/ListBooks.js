import React, { Component } from 'react'
import propTypes from 'prop-types'
import BookShelf from './BookShelf'

class ListBooks extends Component {
  static propTypes = {
    shelfBooks: propTypes.array.isRequired,
    shelves: propTypes.array.isRequired,
    changeShelf: propTypes.func.isRequired
  }

  render() {
    let { shelfBooks, shelves, changeShelf } = this.props

    let selfBook = (shelf) => {

      if (shelf === shelves[0][0]){
        return shelfBooks.filter((book) => {
          return book.shelf === shelves[0][0]
        })
      }
      else if (shelf === shelves[1][0]){
        return shelfBooks.filter((book) => {
          return book.shelf === shelves[1][0]
        })
      }
      else if (shelf === shelves[2][0]){
        return shelfBooks.filter((book) => {
          return book.shelf === shelves[2][0]
        })
      }
    }

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelves.map( (shelf, _) => {
              return <BookShelf
                      key={shelf[0]}
                      shelfname={shelf[1]}
                      books={selfBook(shelf[0])}
                      changeShelf={changeShelf}
                     />
            })}

            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ListBooks