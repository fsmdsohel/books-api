const searchField = document.getElementById("search-field");
const searchBtn = document.getElementById("button-search");
const cardParent = document.getElementById("book-card");
const error = document.getElementById("error-msg");

// fetch data
searchBtn.addEventListener("click", () => {
  document.getElementById("book-count").style.display = "none";
  cardParent.textContent = "";
  const search = searchField.value;
  error.textContent = "";
  if (!search) {
    const pTag = document.createElement("p");
    pTag.innerText = "Search field cannot be empty.";
    error.appendChild(pTag);
    return;
  }

  document.getElementById("spinner").style.display = "flex";

  const url = `https://openlibrary.org/search.json?q=${search}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showBooks(data)); //showBooks

  searchField.value = "";
});

// load image
const loadImage = (imgId) => {
  let imgUrl = "./images/img-not-found.png";
  if (typeof imgId !== "undefined") {
    imgUrl = `https://covers.openlibrary.org/b/id/${imgId}-M.jpg`;
  }
  return imgUrl;
};

// display books
const showBooks = (books) => {
  if (books.docs.length === 0) {
    document.getElementById("spinner").style.display = "none";
    document.getElementById("error-msg").innerText = `No result found`;
    return;
  }

  // show book count
  document.getElementById("book-count").style.display = "block";
  const bookList = books.numFound;

  document.getElementById(
    "total-found"
  ).innerText = `Total Books Found ${bookList}`;
  document.getElementById(
    "total-display"
  ).innerText = `Maximum 100 books display`;

  books.docs.forEach((book) => {
    const image = loadImage(book.cover_i);
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
                 <div class="card h-100 shadow d-flex flex-row">
                        <img src="${image}" class="card-img-top w-50" style="height: 400px" alt="">
                        <div class="card-body w-50">
                            <h4 class="card-title text-center m-0 p-0 text-capitalize"> ${
                              book.title
                            }</h4>
                            <hr>
                            <p class="card-text fs-5"><strong>Author Name: </strong>${
                              book.author_name?.[0]
                                ? book.author_name
                                : "Not found"
                            }</p>
                            <p class="card-text fs-5"><strong>publisher:</strong> ${
                              book.publisher?.[0] ? book.publisher : "Not found"
                            }</p>
                            <p class="card-text fs-5"><strong>Publish Year:</strong> ${
                              book.first_publish_year
                            }</p>
                        </div>
                    </div>
        `;
    cardParent.appendChild(div);
    document.getElementById("spinner").style.display = "none";
  });
};
