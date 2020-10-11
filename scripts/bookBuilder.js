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