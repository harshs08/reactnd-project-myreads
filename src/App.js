import React, { Component } from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import Search from './Search'

class BooksApp extends Component {
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
      <BrowserRouter>
        <div>
          <Route exact path="/" render={ () => (
              <ListBooks 
               shelfBooks={this.state.books}
               shelves={this.state.shelves}
               changeShelf={this.updateShelf}
              />
            )}
          />

          <div className="app">
            <Route exact path="/search" render={ () => (
                <Search
                  books={this.state.books}
                  changeShelf={this.updateShelf}
                />
              )}
            />
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp
