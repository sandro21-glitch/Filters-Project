import { products } from "./products.js";

const productsContainer = document.querySelector('.products-container')


let productsCopy = products

function filteredProducts() {
    if(productsCopy.length < 1) {
        productsContainer.innerHTML = 'No products found'
    }
}

function displayProducts() {
    productsContainer.innerHTML = productsCopy.map(item => {
        return `
        <article class="product">
            <img src="${item.image}" alt="" class="product-img img">
                <footer>
                <h5 class="product-name">${item.title}</h5>
                <span class="product-price">$${item.price}</span>
                </footer>
        </article>
        `
    }).join('')
    filteredProducts() 
}
displayProducts()

const form = document.querySelector('.input-form')
const searchInput = document.querySelector('.search-input')

form.addEventListener('keyup', (e) => {
    e.preventDefault()

    const inputValue = searchInput.value
    productsCopy = products.filter(item => {
        return item.title.toLocaleLowerCase().includes(inputValue)
    })
    displayProducts()
})

const companies = document.querySelector('.companies')

function displayButtons() {

    const uniqueButtons = ['all', ...new Set(products.map(product => product.company))];

    companies.innerHTML = uniqueButtons.map(company => {    
        return  `<button data-id="${company}" class="company-btn">${company}</button>`
    }).join('')
}

companies.addEventListener('click', (e) => {
    e.preventDefault()  

    const target = e.target
    if(target.classList.contains('company-btn')){
        if(target.dataset.id === 'all'){
            productsCopy = products     
        }else {
            productsCopy = products.filter(item => {
                return target.dataset.id === item.company
            })
        }
        searchInput.value = ''
        displayProducts()
    }
})

displayButtons()
