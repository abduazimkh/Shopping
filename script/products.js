const productIdInURL = +new URLSearchParams(window.location.search).get("productId");
const singleImage = document.querySelector("#single-product-image")
const singleTitle = document.querySelector("#single-product-title")
const singlePrice = document.querySelector("#single-product-price")
const singleDescription = document.querySelector("#single-product-description")
const singleCatName = document.querySelector("#single-product-category-name")

fetch(`https://api.escuelajs.co/api/v1/products/${productIdInURL}`)
  .then(response => response.json())
  .then(data => renderSingleProduct(data))

function renderSingleProduct(singleProductData){
  singleImage.src = singleProductData.images[0];
  singleTitle.innerHTML = singleProductData.title
  singlePrice.innerHTML = singleProductData.price
  singleDescription.innerHTML = singleProductData.description
  singleCatName.innerHTML = singleProductData.category.name
}