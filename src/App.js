import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
    shelves: [
      ["currentlyReading", "Currently Reading"],
      ["wantToRead", "Want to Read"],
      ["read", "Read"]
    ]
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({ books })
      })
      .catch((e) => {
        console.log(e)
      })
  }

  updateShelf = (book, newShelf) => {

    //check if book is already in collection
    let isInSelf = false

    this.state.books.forEach((item) => {
      item.id === book.id && (isInSelf=true)
    })


    //call update API
    BooksAPI.update({ id: book.id}, newShelf )
      .then((response) => {
        //if book already in shelf, change state of book in state
        // without calling the getAll() API, better performance
        if(isInSelf) {
          let updatedBooks = JSON.parse(JSON.stringify(this.state.books))
          updatedBooks.forEach((item) => {
            if(item.id === book.id) {
              item.shelf = newShelf
            }
          })

          // update state with new collection (which now has the book's
          // new shelf category)
          this.setState({ books: updatedBooks })
        }
        else {
          //book is new, update collection in state by calling API
          //to retrieve updated collection from server (which now has
          // the new book already added)
          BooksAPI.getAll()
            .then((books) => {
              this.setState({ books })
            })
            .catch((e) => {
              console.log(e)
            })
        }
      })
      .catch((e) => {
        console.error(e)
      })

    }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
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
        ) : ( <ListBooks 
               shelfBooks={this.state.books}
               shelves={this.state.shelves}
               changeShelf={this.updateShelf}
              />
        )}
      </div>
    )
  }
}

export default BooksApp
