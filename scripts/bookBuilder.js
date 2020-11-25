/* eslint-env browser */
const bookshelf = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = () => read ? `${title} by ${author}, ${pages} pages, read` : `${title} by ${author}, ${pages} pages, not yet read`;
}

function addBookToShelf(title, author, pages, read) {
    bookshelf.push(new Book(title, author, pages, read));
}

addBookToShelf('The Hobbit', 'J.R.R. Tolkien', 669, false);
addBookToShelf('Thrawn', 'Timothy Zahn', 742, true);
addBookToShelf('Percy Jackson: The Lightning Thief and the thunder', 'Rick Riordan', 432, true);
addBookToShelf('The Hobbit', 'J.R.R. Tolkien', 669, false);
addBookToShelf('Thrawn', 'Timothy Zahn', 742, true);
addBookToShelf('Percy Jackson: The Lightning Thief', 'Rick Riordan', 432, true);

function displayBooks() {
    const bookContainer = document.querySelector('#book-container');

    bookshelf.forEach(book => {
        const bookCard = document.createElement('div');

        bookCard.classList.add('book-card');
        bookCard.id = `book${bookshelf.indexOf(book)}`;

        const bookInfo = document.createElement('div');
        const title = document.createElement('h2');
        const author = document.createElement('p');
        const pageCount = document.createElement('p');

        const bookActions = document.createElement('div');
        const readStatus = document.createElement('div');
        const readStatusIcon = document.createElement('i');
        const removeButton = document.createElement('div');
        const removeButtonIcon = document.createElement('i');

        bookInfo.classList.add('book-info');
        title.classList.add('title');
        author.classList.add('author');
        pageCount.classList.add('count');

        bookActions.classList.add('actions');
        readStatus.classList.add('btn', 'status', book.read ? 'read' : 'unread');
        readStatusIcon.classList.add(book.read ? 'fas' : 'far', 'fa-star');
        removeButton.classList.add('btn', 'remove');
        removeButtonIcon.classList.add('far', 'fa-trash-alt');

        title.textContent = book.title;
        author.textContent = `by ${book.author}`;
        pageCount.textContent = `${book.pages} pages`;

        bookInfo.appendChild(title);
        bookInfo.appendChild(author);
        bookInfo.appendChild(pageCount);

        removeButton.appendChild(removeButtonIcon);
        readStatus.appendChild(readStatusIcon);

        bookActions.appendChild(removeButton);
        bookActions.appendChild(readStatus);

        bookCard.appendChild(bookInfo);
        bookCard.appendChild(bookActions);

        bookContainer.appendChild(bookCard);
    });
}

window.onload = displayBooks;