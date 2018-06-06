class Book {
   constructor(title, author, isbn) {
      this.title = title;
      this.author = author;
      this.isbn = isbn;
   }
}

class UI {
   addBookToList(book){
      const list = document.querySelector('#book-list');

      const row = document.createElement('tr');
         row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href = '#' class='delete'>X<a></td>
         `;

         list.appendChild(row);
   }
   showAlert(message, className){
      let div = document.createElement('div'),
            container = document.querySelector('.container'),
            form = document.querySelector('#book-form');
      div.className = `alert ${className}`;
      div.appendChild(document.createTextNode(message));
      container.insertBefore(div, form);

      setTimeout(function() {
         document.querySelector('.alert').remove(); }, 800);
   }
   deleteBook(target){
      if(target.className === 'delete') {
         target.parentElement.parentElement.remove();
      }
   }
   clearFields(){
      document.querySelector('#title').value = '';
      document.querySelector('#author').value = '';
      document.querySelector('#isbn').value = '';
   }
}

class Store {
   static getBooks() {
      let books;
      if(localStorage.getItem('books') === null) {
         books = [];
      } else {
         books = JSON.parse(localStorage.getItem('books'));
      }
      return books;
   }
   static displayBooks() {
      const books = Store.getBooks();

      books.forEach(function(book){
         const ui = new UI;
         
         ui.addBookToList(book);
      });
   }
   static addBook(book) {
         const books = Store.getBooks();

         books.push(book);

         localStorage.setItem('books', JSON.stringify(books));
   }
   static removeBook(isbn) {
      const books = Store.getBooks();

      books.forEach(function(book, index){
         if(book.isbn === isbn) {
            books.splice(index, 1);
         }
      });

      localStorage.setItem('books', JSON.stringify(books));
   }
}

document.addEventListener('DOMContentLoaded', Store.displayBooks);

document.querySelector("#book-form").addEventListener('submit',
   function(e) {
      var title = document.querySelector('#title').value,
                        author = document.querySelector('#author').value,
                        isbn = document.querySelector('#isbn').value;

      const book = new Book(title, author, isbn);
      const ui = new UI();

      if (title === '' || author === '' || isbn === '') {
         ui.showAlert('Please fill in all fields', 'error');
      } else {

         ui.addBookToList(book);
         Store.addBook(book);
         ui.showAlert('Book Added!', 'success');
         ui.clearFields();
      }

      e.preventDefault();
   });
document.querySelector('#book-list').addEventListener('click', function(e) {

let ui = new UI();

ui.deleteBook(e.target);

Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

ui.showAlert('Book Removed!', 'success');

e.preventDefault();
});
