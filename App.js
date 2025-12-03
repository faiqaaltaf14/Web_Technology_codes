let products = [];

const fetchData = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    products = await response.json();
    renderProducts(products);
};

const renderProducts = (products) => {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; 

    products.forEach(({ id, title, price, description, image }) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${image}" alt="${title}" />
            <h3>${title}</h3>
            <p>${description}</p>
            <p>Price: $${price}</p>
        `;
        productList.appendChild(productDiv);
    });
};

const searchInput = document.getElementById('search');
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.title.toLowerCase().includes(searchTerm)
    );
    renderProducts(filteredProducts);
});

const sortSelect = document.getElementById('sort');
sortSelect.addEventListener('change', (e) => {
    const sortBy = e.target.value;
    let sortedProducts;

    if (sortBy === 'name') {
        sortedProducts = products.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'price') {
        sortedProducts = products.sort((a, b) => a.price - b.price);
    }
    
    renderProducts(sortedProducts);
});

window.onload = fetchData;
