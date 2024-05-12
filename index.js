
const form = document.getElementById("form-id");
const openDialogBtn = document.getElementById("openDialogBtn");
const dialog = document.getElementById("dialog");

const book = new Book()

openDialogBtn.addEventListener("click", () => dialog.showModal());
form.addEventListener("reset", () => dialog.close())

form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent default form submission behavior

  const authorInput = document.getElementById("author-input").value;
  const titleInput = document.getElementById("title-input").value;
  const pagesNumber = document.getElementById("pages-number").value;
  const isRead = document.getElementById("is-read").checked;

  book.addBookToLibrary(authorInput, titleInput, pagesNumber, isRead);
  createCards()

  // Clear the form
  form.reset();
  dialog.close();
});


function createCards() {
  const cardContainer = document.getElementById("card-container");
  cardContainer.replaceChildren()
  myLibrary.forEach((element) => {
    const cardDiv = document.createElement("div");
    cardDiv.className = "card";

    const cardTitle = document.createElement("h3");
    cardTitle.textContent = element.title;

    const cardAuthor = document.createElement("p");
    const cardAuthorData = document.createElement("b");
    cardAuthorData.textContent = element.author;
    cardAuthor.textContent = "by ";
    cardAuthor.appendChild(cardAuthorData);

    const cardPages = document.createElement("p");
    cardPages.textContent = "Number of Pages: ";
    const cardAuthorPages = document.createElement("b");
    cardAuthorPages.textContent = element.pagesNumber;
    cardPages.appendChild(cardAuthorPages);


    const label = document.createElement("label")
    label.textContent = "Have you read? "
    const cardSwitch = document.createElement("span")
    cardSwitch.className = "switch"
    cardSwitch.style.margin = "0 1rem"
    const cardInput = document.createElement("input")
    cardInput.className = "form-input switch"
    cardInput.type = "checkbox";
    cardInput.checked = element.isRead
    cardInput.onchange = (_) => book.toggleIsRead(element.id)
    const span = document.createElement("span")
    span.className = "slider round"
    cardSwitch.appendChild(cardInput)
    cardSwitch.appendChild(span)
    label.appendChild(cardSwitch)


    const cardButton = document.createElement("button");
    cardButton.textContent = "Remove";
    cardButton.className = "btn btn-danger";
    const {deleteDialog, dialogBtn} = createDialog(element.id, cardButton);

    cardDiv.appendChild(cardTitle);
    cardDiv.appendChild(cardAuthor);
    cardDiv.appendChild(cardPages);
    cardDiv.appendChild(label)
    cardDiv.appendChild(dialogBtn);
    cardDiv.appendChild(deleteDialog);

    cardContainer.appendChild(cardDiv);
  });
}

function createDialog(id, dialogBtn) {
  const deleteDialog = document.createElement("dialog");
  const h2 = document.createElement("h2");
  const p = document.createElement("p");
  const div = document.createElement("div")
  const button1 = document.createElement("button");
  const button2 = document.createElement("button");

  deleteDialog.id = `delete_book_dialog_${id}`;
  deleteDialog.ariaLabelledBy = `delete_book_dialog_heading_${id}`;
  dialogBtn.addEventListener("click", () => deleteDialog.showModal());

  h2.id = `delete_book_dialog_heading_${id}`;
  h2.textContent = "Delete Book"
  h2.className = "h2"

  p.textContent = "Are you sure you want to delete this book?";
  p.style.padding = "1.5rem 0"

  button1.id = `delete_button_${id}`;
  button1.textContent = "Delete";
  button1.className = "btn btn-danger";
  button1.addEventListener("click", () => {
    book.deleteBookFromLibrary(id);
    createCards();
    deleteDialog.close();
  });

  button2.id = `cancel_button_${id}`;
  button2.textContent = "Cancel";
  button2.className = "btn btn-primary";
  button2.addEventListener("click", () => deleteDialog.close());

  div.className = "flex-right"
  div.appendChild(button1)
  div.appendChild(button2)

  deleteDialog.appendChild(h2);
  deleteDialog.appendChild(p);
  deleteDialog.appendChild(div);
  return {dialogBtn, deleteDialog}
}
