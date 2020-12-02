/* eslint-env browser */
const bookshelf = [];
let currentID = 0;

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = currentID++;
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

function displayBook(book) {
    const bookContainer = document.querySelector('#book-container');

    const bookCard = document.createElement('div');

    bookCard.classList.add('book-card');
    bookCard.id = `book${book.id}`;

    const bookInfo = document.createElement('div');
    const title = document.createElement('h2');
    const author = document.createElement('p');
    const pageCount = document.createElement('p');

    const bookActions = document.createElement('div');
    const readStatus = document.createElement('div');
    const readStatusIcon = document.createElement('i');
    const removeButton = document.createElement('div');
    const removeButtonIcon = document.createElement('i');

    removeButton.addEventListener('click', removeBook);
    readStatus.addEventListener('click', toggleReadStatus);

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
}

function removeBook(e) {
    const bookDiv = document.querySelector('#book-container');

    if(e.target.tagName == 'DIV') {
        bookDiv.removeChild(e.target.parentElement.parentElement);
    } else {
        bookDiv.removeChild(e.target.parentElement.parentElement.parentElement);
    }
}

function toggleReadStatus(e) {
    if(e.target.tagName == 'DIV') {
        e.target.classList.toggle('read');
        e.target.classList.toggle('unread');

        e.target.firstChild.classList.toggle('fas');
        e.target.firstChild.classList.toggle('far');
    } else {
        e.target.parentElement.classList.toggle('read');
        e.target.parentElement.classList.toggle('unread');

        e.target.classList.toggle('fas');
        e.target.classList.toggle('far');
    }
}

function resetFormInputs() {
    const title = document.querySelector('#book-title');
    const author = document.querySelector('#book-author');
    const pages = document.querySelector('#book-pages');
    const bookRead = document.querySelector('#read-status');

    title.value = '';
    author.value = '';
    pages.value = '';
    bookRead.checked = false;
}

function submitBookForm() {
    const title = document.querySelector('#book-title').value;
    const author = document.querySelector('#book-author').value;
    const pages = document.querySelector('#book-pages').value;
    const bookRead = document.querySelector('#read-status').checked;

    const form = document.querySelector('#add-book-form');

    form.classList.toggle('hide');
    resetFormInputs();
    addBookToShelf(title, author, pages, bookRead);
}

function showBookForm() {
    const form = document.querySelector('#add-book-form');

    form.classList.toggle('hide');
}

document.querySelector('#add-book').addEventListener('click', submitBookForm);
document.querySelector('#new-book').addEventListener('click', showBookForm);
window.onload = bookshelf.forEach(book => displayBook(book));