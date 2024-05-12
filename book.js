let myLibrary = [];
function Book() {}

Book.prototype = {
  addBookToLibrary: function (author, title, pagesNumber, isRead) {
    myLibrary.push({
      author,
      title,
      pagesNumber,
      isRead,
      id: myLibrary.length,
    });
  },
  toggleIsRead: function (id) {
    const index = myLibrary.findIndex((x) => x.id === id);
    if (index === -1) return;
    myLibrary[index].isRead = !myLibrary[index].isRead;
  },
  deleteBookFromLibrary: function (id) {
    myLibrary = myLibrary.filter((elem) => elem.id !== id);
  },
};


