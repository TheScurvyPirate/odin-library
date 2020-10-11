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

function displayBooks() {
    const bookContainer = document.querySelector('#book-container');

    bookshelf.forEach(book => {
        const bookCard = document.createElement('div');

        bookCard.classList.add('book-card');
        bookCard.id = `book${bookshelf.indexOf(book)}`;

        const title = document.createElement('h4');
        const author = document.createElement('p');
        const pageCount = document.createElement('p');
        const readStatus = document.createElement('div');

        title.classList.add('title');
        author.classList.add('author');
        pageCount.classList.add('count');
        readStatus.classList.add('status');
        readStatus.classList.add(book.read ? 'read' : 'unread');

        title.textContent = book.title;
        author.textContent = book.author;
        pageCount.textContent = book.pages;

        bookCard.appendChild(title);
        bookCard.appendChild(author);
        bookCard.appendChild(pageCount);
        bookCard.appendChild(readStatus);

        bookContainer.appendChild(bookCard);
    });
}

window.onload = displayBooks;