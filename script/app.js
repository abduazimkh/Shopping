const productContainer = document.querySelector(".product-container");
const loader = document.querySelector(".lds-spinner");
const searchForm = document.querySelector("#search-form");
const searchInput = searchForm.querySelector("input");
const searchSelect = searchForm.querySelector("#search-select");
const signUpLink = document.querySelector(".signup-link")
const loginLink = document.querySelector(".login-link")
const accountpLink = document.querySelector(".account-link")
const minPrice = searchForm.querySelector("#min-price");
const maxPrice = searchForm.querySelector("#max-price");


const allLikedProducts = JSON.parse(localStorage.getItem("likedProducts")) || [];

// loading

checkDataIsLoading(true);
fetch("https://api.escuelajs.co/api/v1/products")
  .then(response => response.json())
  .then(data => renderProducts(data))

fetch("https://api.escuelajs.co/api/v1/categories")
  .then(response => response.json())
  .then(data => {
    const optionsFragment = document.createDocumentFragment();
    data.forEach(categoryItem => {
      const option = document.createElement("option");
      option.value = categoryItem.id;
      option.innerHTML = categoryItem.name;
      optionsFragment.appendChild(option);
    });
    searchSelect.appendChild(optionsFragment);
});


// create card

function renderProducts(productData){
  checkDataIsLoading(false)
  productContainer.innerHTML = ""
  const productsFragment = document.createDocumentFragment();
  productData.forEach(product => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
    <i data-product-id="${product.id}"  class="fas fa-heart " style="${allLikedProducts.findIndex(item => item.id === product.id) !== -1 ? 'color: red;' : 'color: black;'}"></i>
    <a href="../pages/products.html?productId=${product.id}">
    <img src="${product.images[0]}" />
    </a>
      <h3 title="${product.title}">${product.title.split("").length > 15 ? product.title.slice(0, 15) + "..." : product.title}</h3>
      <strong>&dollar;${product.price}</strong>
      <button data-product-id="${product.id}">Delete this product</button>
    `;
    productsFragment.appendChild(div)
  })
  productContainer.appendChild(productsFragment);
}

// loading 

function checkDataIsLoading(loadingState){
  if(loadingState){
    loader.style.display = " inline-block"
    loader.setAttribute("loading", true)
  }
  else{
    loader.style.display = " none"
    loader.removeAttribute("loading")
  }
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  checkDataIsLoading(true);
  fetch(`https://api.escuelajs.co/api/v1/products/?title=${searchInput.value}` && `https://api.escuelajs.co/api/v1/products/?price_min=${minPrice.value}&price_max=${maxPrice.value}`)
    .then(response => response.json())
    .then(data => renderProducts(data))
  searchInput.value = "";
  minPrice.value = "";
  maxPrice.value = "";

})


// select category 

searchSelect.addEventListener("change", () => {
  checkDataIsLoading(true);
  fetch(`https://api.escuelajs.co/api/v1/products/?categoryId=${searchSelect.value}`)
    .then(response => response.json())
    .then(data => renderProducts(data))
    searchSelect.firstElementChild.value = ""
    searchSelect.firstElementChild.innerHTML = "All"
    searchSelect.firstElementChild.removeAttribute("disabled");
});

(() => {
  if(localStorage.getItem("user-auth-token")){
    signUpLink.style.display = "none";
    loginLink.style.display = "none";
    accountpLink.style.display = "block";
  }
  else{
    signUpLink.style.display = "block";
    loginLink.style.display = "block";
    accountpLink.style.display = "none";
  }
})()


// like and delete 

productContainer.addEventListener("click", (e) => {
if(e.target.closest(".fa-heart")){
  if(e.target.closest(".fa-heart")){
    const likedProductId = +e.target.closest(".fa-heart").dataset.productId;
    fetch(`https://api.escuelajs.co/api/v1/products/${likedProductId}`)
      .then(response => response.json())
      .then(data => {
        allLikedProducts.unshift(data)
        localStorage.setItem("likedProducts", JSON.stringify(allLikedProducts));
      })
    }

    fetch("https://api.escuelajs.co/api/v1/products")
      .then(response => response.json())
      .then(data => renderProducts(data))

}else{
  if(e.target.closest("[data-product-id]")){
    const productId = +e.target.dataset.productId;
    let userAgee = confirm("Are you sure to delete this product?")
    if(userAgee){
      document.body.style.filter = "blur(3px)";
      fetch(`https://api.escuelajs.co/api/v1/products/${productId}`, 
      {
          method: "DELETE"
        }
      ).then(response => {
        if(response){
          fetch("https://api.escuelajs.co/api/v1/products")
            .then(response => response.json())
            .then(data => renderProducts(data))
        }
        document.body.style.filter = "blur(0)";
      })
    }
  }
}
});



