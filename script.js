// Subscription Form Handler
const subscribeForm = document.getElementById('subscribe-form');
if (subscribeForm) {
    subscribeForm.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Thank you for subscribing!');
        subscribeForm.reset();
    });
}

// Filter Products in Shop Page
function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    products.forEach(product => {
        if (category === 'all' || product.dataset.category === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Read More Toggle in News
const readMoreLinks = document.querySelectorAll('.read-more');
readMoreLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const article = e.target.closest('.news-card');
        const fullText = document.createElement('p');
        fullText.textContent = 'Full article content goes here...';
        article.appendChild(fullText);
        e.target.style.display = 'none';
    });
});

// Smooth Scroll for Anchor Links
const anchorLinks = document.querySelectorAll('a[href^="#"]');
anchorLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const cartItems = document.getElementById("cart-items");
    const totalElement = document.getElementById("total");
    const checkoutButton = document.getElementById("checkout");
    let cart = [];
    let total = 0;

    // Function to update the cart display
    const updateCartDisplay = () => {
        cartItems.innerHTML = "";
        cart.forEach((item, index) => {
            const li = document.createElement("li");
            li.innerText = `${item.name} - $${item.price.toFixed(2)}`;
            const removeButton = document.createElement("button");
            removeButton.innerText = "Remove";
            removeButton.addEventListener("click", () => removeFromCart(index));
            li.appendChild(removeButton);
            cartItems.appendChild(li);
        });
        totalElement.innerText = `Total: $${total.toFixed(2)}`;
    };

    // Function to add items to the cart
    const addToCart = (product) => {
        cart.push(product);
        total += product.price;
        updateCartDisplay();
    };

    // Function to remove items from the cart
    const removeFromCart = (index) => {
        total -= cart[index].price;
        cart.splice(index, 1);
        updateCartDisplay();
    };

    // Add event listeners to all "Add to Cart" buttons
    document.querySelectorAll(".product-card button").forEach((button) => {
        button.addEventListener("click", (e) => {
            const productCard = e.target.closest(".product-card");
            const name = productCard.querySelector("h3").innerText;
            const price = parseFloat(productCard.querySelector(".price").innerText.replace("$", ""));
            const product = { name, price };
            addToCart(product);
        });
    });

    // Checkout button functionality
    checkoutButton.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
        } else {
            alert("Thank you for your purchase!");
            cart = [];
            total = 0;
            updateCartDisplay();
        }
    });
});
