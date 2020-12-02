/* eslint-env browser */
const localStorage = window.localStorage;
const savedBooks = JSON.parse(localStorage.getItem('bookshelf'));

function Book(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
    this.info = () => read ? `${title} by ${author}, ${pages} pages, read` : `${title} by ${author}, ${pages} pages, not yet read`;
}

function addBookToShelf(title, author, pages, read) {
    const nextId = +localStorage.getItem('nextId') || 0;
    const newBook = new Book(title, author, pages, read, nextId);
    const bookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];

    bookshelf.push(newBook);
    localStorage.setItem('bookshelf', JSON.stringify(bookshelf));
    localStorage.setItem('nextId', nextId + 1);

    displayBook(newBook);
}

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
    const bookshelf = JSON.parse(localStorage.getItem('bookshelf'));
    const bookToRemove = e.target.tagName == 'DIV' ? e.target.parentElement.parentElement : e.target.parentElement.parentElement.parentElement;
    const indexOfBookToRemove = bookshelf.findIndex(book => book.id == bookToRemove.id.slice(4));

    localStorage.setItem('bookshelf', JSON.stringify([...bookshelf.slice(0, indexOfBookToRemove), ...bookshelf.slice(indexOfBookToRemove + 1)]));
    bookDiv.removeChild(bookToRemove);
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
window.onload = savedBooks.forEach(book => displayBook(book));