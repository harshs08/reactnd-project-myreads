import React, { Component } from 'react'
import propTypes from 'prop-types'

class BookShelf extends Component {
	static propTypes = {
		books: propTypes.array.isRequired
	}

	render() {
		return (
      <div className="bookshelf">
      	<h2 className="bookshelf-title">{this.props.shelfname}</h2>
      		<div className="bookshelf-books">
            <ol className="books-grid">
            	<li key="1">Book</li>
            </ol>
					</div>
      </div>
		)
	}
}

export default BookShelf