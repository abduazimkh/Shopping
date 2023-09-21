
const productContainer = document.querySelector(".product-container");
const likedProductFragment = document.createDocumentFragment();
JSON.parse(localStorage.getItem("likedProducts")).forEach(likedproduct => {
  const div = document.createElement("div");
  div.className ="liked-product";
  div.innerHTML = `
    <a href="../pages/products.html?productId=${likedproduct.id}">
      <img src="${likedproduct.images[0]}" />
    </a>
    <h3 title="${likedproduct.title}">${likedproduct.title.split("").length > 20 ? likedproduct.title.slice(0, 20) + "..." : likedproduct.title}</h3>
    <strong>&dollar;${likedproduct.price}</strong>
  `
  likedProductFragment.appendChild(div);
})
productContainer.appendChild(likedProductFragment);