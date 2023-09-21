const createForm = document.querySelector("#create-form");
const title = createForm.querySelector("#title"); 
const price = createForm.querySelector("#price"); 
const description = createForm.querySelector("#desc"); 
const categoryId = createForm.querySelector("#catId"); 
const imgUrl = createForm.querySelector("#imgUrl"); 

let adderApi = `https://api.escuelajs.co/api/v1/products/`;

createForm.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(adderApi, 
        {
            method: "POST",
            body: JSON.stringify({
                title: title.value,
                price: price.value,
                description: description.value,
                categoryId: categoryId.value,
                images: [imgUrl.value]
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }
        )
            .then(response => response.json())
            .then(data => console.log(data))
            title.value = ""
            price.value = ""
            description.value = ""
            categoryId.value = ""
            imgUrl.value = ""
})