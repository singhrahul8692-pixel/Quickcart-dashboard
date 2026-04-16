let products = [];
let cartCount = 0;

let box = document.getElementById("box");

// Loader
box.innerHTML = "Loading...";

// Fetching the API from external source
fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(data => {
    products = data;
    show(products);
  })
  //error handling
  .catch(() => {
    box.innerHTML = "Something went wrong ❌";
  });

// Showing function for product
function show(data) {
  box.innerHTML = "";

  data.forEach(item => {
    box.innerHTML += `
      <div class="col-md-4 col-sm-6 mb-3">
        <div class="card p-2">
          <img src="${item.image}">
          <p>${item.title}</p>
          <p>₹${item.price}</p>

          <button class="btn btn-primary mb-1" onclick='showDetails(${JSON.stringify(item)})'>
            View
          </button>

          <button class="btn btn-success" onclick="addToCart()">
            Add to Cart
          </button>
        </div>
      </div>
    `;
  });
}

// Searching function
document.getElementById("search").addEventListener("input", function() {
  let text = this.value.toLowerCase();

  let filtered = products.filter(item =>
    item.title.toLowerCase().includes(text)
  );

  show(filtered);
});

// Category filter applying 
document.getElementById("category").addEventListener("change", function() {
  let value = this.value;

  if (value === "all") {
    show(products);
  } else {
    let filtered = products.filter(item => item.category === value);
    show(filtered);
  }
});

// Sorting the items
document.getElementById("sort").addEventListener("change", function() {
  let value = this.value;
  let sorted = [...products];

  if (value === "low") {
    sorted.sort((a, b) => a.price - b.price);
  } else if (value === "high") {
    sorted.sort((a, b) => b.price - a.price);
  }

  show(sorted);
});

// Carting 
function addToCart() {
  cartCount++;
  document.getElementById("cart").innerText = "Cart: " + cartCount;
}

function showDetails(item) {
  document.getElementById("modal").style.display = "block";

  document.getElementById("mTitle").innerText = item.title;
  document.getElementById("mDesc").innerText = item.description;
  document.getElementById("mPrice").innerText = "Price: ₹" + item.price;
  document.getElementById("mRating").innerText = "Rating: " + item.rating.rate;
}
function closeModal() {
  document.getElementById("modal").style.display = "none";
}