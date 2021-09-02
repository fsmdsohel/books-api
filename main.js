const searchField = document.getElementById("search-field");
const searchBtn = document.getElementById("button-search");
const cardParent = document.getElementById("book-card");
const error = document.getElementById("error-msg");

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
  //   Clear;

  document.getElementById("spinner").style.display = "flex";

  const url = `https://openlibrary.org/search.json?q=${search}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showBooks(data)); //showBooks

  searchField.value = "";
});

const loadImage = (imgId) => {
  console.log(imgId);
  let imgUrl = "./images/img-not-found.png";
  if (typeof imgId !== "undefined") {
    imgUrl = `https://covers.openlibrary.org/b/id/${imgId}-M.jpg`;
  }
  return imgUrl;
};

const showBooks = (books) => {
  if (books.length === 0) {
    document.getElementById("spinner").style.display = "none";
    document.getElementById("books-numbers").innerText = `No result found`;
    return;
  }

  // books count
  document.getElementById("book-count").style.display = "block";
  const bookList = books.numFound;
  document.getElementById(
    "total-found"
  ).innerText = `Total Books Found ${bookList}`;
  document.getElementById(
    "total-display"
  ).innerText = `Maximum 100 books display`;
  books.docs.forEach((book) => {
    // console.log(book);
    const image = loadImage(book.cover_i);
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
            <div class="card h-100 shadow">
                    <img src="${image}" class="card-img-top" style="height: 400px" alt="">
                <div class="card-body">
                    <h5 class="card-title">Book Name: ${book.title}</h5>
                    <p class="card-text">Author Name: ${book.author_name}</p>
                    <p class="card-text">publisher: ${book.publisher}</p>
                    <p class="card-text">Publish Year: ${book.first_publish_year}</p>
                </div>
            </div>
        `;
    cardParent.appendChild(div);
    document.getElementById("spinner").style.display = "none";
  });
};

/*
You11:37 PM
https://covers.openlibrary.org/b/id/884293-M.jpg
You11:57 PM
https://covers.openlibrary.org/b/id/8631303-L.jpg
*/
