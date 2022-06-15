const app = document.getElementById('app')
const form = document.getElementById('form')
const search = document.getElementById('search')
const loader = document.getElementById('loader')
const mainLoader = document.getElementById('loadermain')
let Products = []

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const product = search.value
    if(product){
        var test = Products.includes(product);
        console.log(Products);
        console.log(test);
        search.value = ""
    }
})

const getProducts = async() =>{
    loader.style.display = "inline-block";
    mainLoader.style.display = "flex"
    wrapper.style.display = "none"
    try{
        const response = await fetch(`https://fakestoreapi.com/products`)
        const data = await response.json()
        console.log(data);
        Products = data
        htmlProd()
    }
    catch(err){
        console.log(err);
    }
    loader.style.display = "none";
    mainLoader.style.display = "none"
    wrapper.style.display = "block"
}

function generateCard(product){
    return `
        <div class="card">
            <img src="${product.image}" class="card-image" alt="${product.title}"/>
            <div class="card-body"><h6 class="card-text">${product.title}</h6></div>
            <div class="card-footer">
                <button class="btn btn-outline-primary" onclick="showModal(${product})" data-bs-toggle="modal" data-bs-target="#exampleModal">Show more</button>
            </div>
        </div>
    `
}

const showModal = (e) =>{
    console.log(e);
}

let start = 0;
let end = 10;


const htmlProd = () =>{
    let emptylist = ''
    Products.slice(start,end).forEach((prod)=>(
        emptylist += generateCard(prod)
    ))
    app.innerHTML = emptylist
}
getProducts();