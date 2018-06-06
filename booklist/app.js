function Book(title, author, isbn) {
   this.title = title;
   this.author = author;
   this.isbn = isbn;
}

function UI() {}

UI.prototype.addBookToList = function (book) {
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

UI.prototype.showAlert = function(message, className) {
   let div = document.createElement('div'),
         container = document.querySelector('.container'),
         form = document.querySelector('#book-form');
   div.className = `alert ${className}`;
   div.appendChild(document.createTextNode(message));
   container.insertBefore(div, form);

   setTimeout(function() {
      document.querySelector('.alert').remove(); }, 800);
}

UI.prototype.deleteBook = function(target) {
   if(target.className === 'delete') {
      target.parentElement.parentElement.remove();
   }
}


UI.prototype.clearFields =  function() {
   document.querySelector('#title').value = '';
   document.querySelector('#author').value = '';
   document.querySelector('#isbn').value = '';
}

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
               ui.showAlert('Book Added!', 'success');
               ui.clearFields();
            }



            e.preventDefault();
         });
document.querySelector('#book-list').addEventListener('click', function(e) {

let ui = new UI();

ui.deleteBook(e.target);

ui.showAlert('Book Removed!', 'success');

   e.preventDefault();
});
