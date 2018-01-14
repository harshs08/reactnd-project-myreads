import React from 'react'

import Book from './Book'

const BookShelf = (props) => {
   let { shelfname, books, changeShelf } = props

   return(
      <div className="bookshelf" >
         <h2 className="bookshelf-title">{shelfname}</h2>
         <div className="bookshelf-books">
            <ol className="books-grid">
              { books.length > 0 ? (
                	books.map(book => (
                    <li key={book.id}>
                      <Book
                        book={book}
                        presetSelectMenuValue={book.shelf}
                        changeShelf={changeShelf}
                       />
                    </li>
                  ))
               	) : (
                  <h2>No Book</h2>
               )}
            </ol>
         </div>
      </div>
   )

}

export default BookShelf