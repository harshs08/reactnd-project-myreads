import React from 'react'

const Book = (props) => {

  let { book, changeShelf, presetSelectMenuValue } = props

  const handleShelfChange = (book, newShelf) => {
    changeShelf(book,newShelf);
  }

  let coverImageLink;

  //if link for cover image exists, use it
  if(book.imageLinks) {
    coverImageLink = `url('${book.imageLinks.smallThumbnail}')`
  }
  else {
    //no use placeholder image if no image is present
    coverImageLink = "url('http://via.placeholder.com/350x150?text=No+Image')"
  }


  const style = {
    width: 128,
    height: 192,
    backgroundImage: coverImageLink
  }


  return (
    <div className="book" >
      <div className="book-top">
        <div className="book-cover" style={style}></div>
        <div className="book-shelf-changer">
          <select defaultValue={presetSelectMenuValue} onChange={(event) => {handleShelfChange(book, event.target.value) }}>
            <option value="none" disabled>Move to...</option>
            <option value="currentlyReading" >Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors ? book.authors.join(',  ') : 'Unknown Author'}</div>
    </div >
  )
}

export default Book;