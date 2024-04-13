// Storage
let myLibrary = [];

// Functions
function Book(title, author, pages, year, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.year = year;
    this.finished = status || "Reading"; // Set default status to "Reading" if no status is provided
    this.changeFinishedStatus = function() {
        this.finished = (this.finished === "Finished") ? "Reading" : "Finished"; // Toggle between "Finished" and "Reading"
    };
}

function addToMyLibraryArray(book) {
    myLibrary.push(book);
}

function displayBooksHtml(booksArray) {
    let index = 0;
    for (let book of booksArray) {
        const table = document.querySelector(".table");

        // -- create elements --
        const row = document.createElement("tr");
        const bookTitle = document.createElement("td");
        const bookAuthor = document.createElement("td");
        const bookPages = document.createElement("td");
        const bookYear = document.createElement("td");
        const bookFinished = document.createElement("td");
        const btnFinished = document.createElement("button");
        const bookDelete = document.createElement("td");
        const btnDelete = document.createElement("button");
        const imgDelete = document.createElement("img");

        // -- set attributes, classes, etc. --
        row.setAttribute("data-index", index);
        bookTitle.textContent = book.title;
        bookAuthor.textContent = book.author;
        bookPages.textContent = book.pages;
        bookYear.textContent = book.year;

        // Set button text based on status
        if (book.finished === "Finished") {
            btnFinished.textContent = "Finished";
            btnFinished.classList.add("button-finished");
        } else {
            btnFinished.textContent = "Reading";
            btnFinished.classList.add("button-reading");
        }

        btnDelete.setAttribute("data-index", index);
        btnDelete.classList.add("button-delete");
        imgDelete.setAttribute("src", "../img/trash.svg");
        imgDelete.classList.add("image-delete");

        // -- append to DOM --
        row.appendChild(bookTitle);
        row.appendChild(bookAuthor);
        row.appendChild(bookPages);
        row.appendChild(bookYear);
        bookFinished.appendChild(btnFinished);
        row.appendChild(bookFinished);
        btnDelete.appendChild(imgDelete);
        bookDelete.appendChild(btnDelete);
        row.appendChild(bookDelete);
        table.appendChild(row);

        // -- event listener --
        btnFinished.addEventListener("click", (e) => {
            // Toggle the finished status
            book.changeFinishedStatus();
        
            // Update the button text based on the updated status
            btnFinished.textContent = (book.finished === "Finished") ? "Finished" : "Reading";
            // Update the button class based on the updated status
            btnFinished.classList.toggle("button-finished");
            btnFinished.classList.toggle("button-reading");
        });
        
        btnDelete.addEventListener("click", (e) => {
            let removeIndex = e.currentTarget.getAttribute("data-index");
            myLibrary.splice(removeIndex, 1);
            table.removeChild(row);
        });
        index++;
    }
}

function removeBooksHtml() {
    const table = document.querySelector(".table");
    const rowsToRemove = document.querySelectorAll("table tr[data-index]");
    rowsToRemove.forEach((oneRow) => {
        table.removeChild(oneRow);
    })
}


// ------ Event listeners ------

// Event listener for form submission
form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent default form submission
    
    // Get form data
    const formData = new FormData(form);
    const title = formData.get("title");
    const author = formData.get("author");
    const pages = formData.get("pages");
    const year = formData.get("year");

    // Check if any of the fields are empty
    if (!title || !author || !pages || !year) {
        alert("Please fill in all fields before submitting.");
        return;
    }

    // Add the book to the library
    addToMyLibraryArray(new Book(
        title,
        author,
        parseInt(pages), // Convert pages to integer
        parseInt(year), // Convert year to integer
        "Reading" // Default status
    ));

    // Remove existing books from HTML
    removeBooksHtml();
    
    // Display updated library
    displayBooksHtml(myLibrary);
    
    // Reset the form
    form.reset();
});


// Event listener for the "Add Book" button
const buttonAddBook = document.querySelector("#add-book");
const modalDialog = document.querySelector("#dialog");
buttonAddBook.addEventListener("click", () => {
    modalDialog.showModal();  
});

// Event listener for the "Cancel" button in the dialog
const cancelButton = document.querySelector("#cancel-button");
cancelButton.addEventListener("click", (e) => {
    e.preventDefault(); // prevent default form submission
    modalDialog.close();  
});

// ----- Sample books -----
const lawsOfPower = new Book("The 48 Laws of Power", "Robert Greene", 480, 1998, "yes");
addToMyLibraryArray(lawsOfPower);

const fco = new Book("Fundamental Chess Openings", "Paul van der Sterren", 448, 2009, "no");
addToMyLibraryArray(fco);

displayBooksHtml(myLibrary);