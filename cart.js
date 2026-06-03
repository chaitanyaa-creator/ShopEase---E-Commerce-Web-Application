const cartItemsContainer =
    document.getElementById("cartItems");

const totalPrice =
    document.getElementById("totalPrice");

let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

function displayCart() {

    cartItemsContainer.innerHTML = "";

    let total = 0;

    cart.forEach((product, index) => {

        total += product.price;

        const card =
            document.createElement("div");

        card.classList.add("product-card");

        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}">

            <h3>${product.title}</h3>

            <p>₹${Math.round(product.price * 85)}</p>

            <button onclick="removeItem(${index})">
                Remove
            </button>
        `;

        cartItemsContainer.appendChild(card);
    });

    totalPrice.textContent =
        `Total Price: ₹${Math.round(total * 85)}`;
}

function removeItem(index) {

    cart.splice(index, 1);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();
}

displayCart();