import React, { Component } from 'react'
import propTypes from 'prop-types'
import BookShelf from './BookShelf'

class ListBooks extends Component {
	static propTypes = {
		books: propTypes.array.isRequired
	}

	state = {
		shelves: ['currentlyReading', 'wantToRead', 'read']
	}

	render() {
		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					<div>
						{this.state.shelves.map( (shelfname, index) => {
							return <BookShelf key={index} shelfname={shelfname} books={this.props.books} />
						})}
					</div>
				</div>
			</div>
		)
	}
}

export default ListBooks