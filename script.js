const productsContainer = document.getElementById("productsContainer");
const searchInput = document.getElementById("searchInput");
const cartCount = document.getElementById("cartCount");

let allProducts = [];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

cartCount.textContent = cart.length;

// Fetch Products

async function fetchProducts() {
    try {
        const response = await fetch(
            "https://fakestoreapi.com/products"
        );

        const products = await response.json();

        allProducts = products;

        displayProducts(products);

    } catch (error) {
        console.log("Error fetching products:", error);
    }
}

// Display Products

function displayProducts(products) {

    productsContainer.innerHTML = "";

    products.forEach(product => {

        const card = document.createElement("div");

        card.classList.add("product-card");

        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}">

            <h3>${product.title}</h3>

            <p>₹${Math.round(product.price * 85)}</p>

            <button class="add-cart-btn"
                    data-id="${product.id}">
                Add To Cart
            </button>
        `;

        productsContainer.appendChild(card);
    });

    attachCartEvents();
}

// Add To Cart

function attachCartEvents() {

    const buttons =
        document.querySelectorAll(".add-cart-btn");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            const productId =
                Number(button.dataset.id);

            const selectedProduct =
                allProducts.find(product =>
                    product.id === productId
                );

            cart.push(selectedProduct);

            localStorage.setItem(
                "cart",
                JSON.stringify(cart)
            );

            cartCount.textContent = cart.length;

            showToast("Product Added To Cart");
        });
    });
}

// Search Products

searchInput.addEventListener("input", () => {

    const searchText =
        searchInput.value.toLowerCase();

    const filteredProducts =
        allProducts.filter(product =>
            product.title
                .toLowerCase()
                .includes(searchText)
        );

    displayProducts(filteredProducts);
});

// Category Filter

function filterProducts(category) {

    if (category === "all") {
        displayProducts(allProducts);
        return;
    }

    const filteredProducts =
        allProducts.filter(product =>
            product.category === category
        );

    displayProducts(filteredProducts);
}

// Toast Notification

function showToast(message) {

    const toast =
        document.getElementById("toast");

    toast.textContent = message;

    toast.style.display = "block";

    setTimeout(() => {
        toast.style.display = "none";
    }, 2000);
}

// Initial Load

fetchProducts();