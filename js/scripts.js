document.addEventListener("DOMContentLoaded", () => {
    // Login Form Validation
    document.getElementById("loginForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const userRole = document.getElementById("userRole").value;

        // Check if all fields are filled
        if (username && password && userRole) {
            alert("Login successful");

            // Redirect based on user role
            if (userRole === "supplier") {
                window.location.href = "supplier_dashboard.html";
            } else if (userRole === "customer") {
                window.location.href = "customer_dashboard.html";
            }
        } else {
            alert("Please enter all fields and select your role.");
        }
    });
});

    // Register Form 
    document.getElementById("registerForm").addEventListener("submit", function (e) {
        e.preventDefault();
        const regUsername = document.getElementById("regUsername").value;
        const regEmail = document.getElementById("regEmail").value;
        const regPassword = document.getElementById("regPassword").value;
        if (regUsername && regEmail && regPassword) {
            alert("Registration successful");
            window.location.href = "index.html";
        } else {
            alert("Please fill out all fields.");
        }
    });



// Function to add items to the cart
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if item already in cart
    } else {
        cart.push({ name, price, quantity: 1 }); // Add new item to cart
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    showNotification(`${name} has been added to your cart.`);
    updateCartTotal();
}

// Function to show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerText = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000); // Notification will disappear after 3 seconds
}

// Function to update the total amount in the cart
function updateCartTotal() {
    const totalAmount = calculateTotal();
    const totalAmountElement = document.getElementById('totalAmount');
    if (totalAmountElement) {
        totalAmountElement.innerText = totalAmount;
    }
}

// Function to calculate total amount
function calculateTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Function to remove items from the cart
function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    localStorage.setItem('cart', JSON.stringify(cart));
    showNotification(`${name} has been removed from your cart.`);
    displayCart();
}

// Function to clear the cart
function clearCart() {
    localStorage.removeItem('cart');
    cart = [];
    displayCart();
    showNotification('Cart has been cleared.');
}

// Function to display cart contents
function displayCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = '';

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        document.getElementById('totalAmount').innerText = '0';
        return;
    }

    let totalAmount = 0;

    cartItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <h4>${item.name} (₹${item.price})</h4>
            <p>Quantity: <button onclick="changeQuantity('${item.name}', -1)">-</button> ${item.quantity} <button onclick="changeQuantity('${item.name}', 1)">+</button></p>
            <button onclick="removeFromCart('${item.name}')">Remove</button>
        `;
        cartItemsContainer.appendChild(itemDiv);
        totalAmount += item.price * item.quantity;
    });

    document.getElementById('totalAmount').innerText = totalAmount;
}

// Function to change quantity
function changeQuantity(name, change) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(name);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCart();
            updateCartTotal();
        }
    }
}



