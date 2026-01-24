// ============== PRODUCT IMAGE MAPPING ==============
const productImages = {
    'bread_white': 'bread.jpg',
    'bread_buckwheat': 'grain-bread-3135224_1280.jpg',
    'bread_siry': 'seryi.jpg',
    'bread_rye': 'breadBrown.jpg',
    'bread_whole_wheat': 'sourdough-7739022_1280.jpg',
    'bread_seeds': 'bread-8535650_1280.jpg',
    'bread_mak': 'mak.jpg',
    'bread_croissant': 'crusant.jfif',
    'bread_pampushka': 'pampuska.jfif',
    'bread_surnyk': 'surnyk.jfif',
    'bread_baguette': 'baguette.jfif',
    'bread_focaccia': 'fokacca.jfif'
};

function getProductImage(productId) {
    return productImages[productId] || 'bread.jpg';
}

// ============== CART SYSTEM WITH LOCALSTORAGE ==============

// Get cart from localStorage or initialize empty array
function getCart() {
    const cartJSON = localStorage.getItem('bakeryCart');
    return cartJSON ? JSON.parse(cartJSON) : [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('bakeryCart', JSON.stringify(cart));
}

// Add item to cart
function addToCart(productId, productName, productPrice) {
    let cart = getCart();
    
    // Check if item already exists in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        // If exists, increase quantity
        existingItem.quantity += 1;
    } else {
        // If new, add to cart
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            image: getProductImage(productId),
            quantity: 1
        });
    }
    
    saveCart(cart);
    updateCartCount();
    alert("Товар успішно додано до кошика!");
}

// Remove item from cart
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    updateCartCount();
}

// Update item quantity
function updateQuantity(productId, newQuantity) {
    let cart = getCart();
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (newQuantity < 1) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            saveCart(cart);
            updateCartCount();
        }
    }
}

// Get total price of cart
function getCartTotal() {
    let cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Get cart item count
function getCartCount() {
    let cart = getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
}

// Clear entire cart
function clearCart() {
    localStorage.setItem('bakeryCart', JSON.stringify([]));
}

// ============== PAGE FUNCTIONALITY ==============

// Handle "More Info" button
let more = document.getElementById("More");
if (more) {
    more.addEventListener("click", function() {
        let moreInfo = document.getElementById("moreInfo");
        if (moreInfo) {
            moreInfo.style.display = moreInfo.style.display === "none" ? "block" : "none";
        }
    });
}

// Handle "Add to Cart" button
let toTheCard = document.getElementById("ToTheCard");
if (toTheCard) {
    toTheCard.addEventListener("click", function() {
        // Get product data from data attributes if available
        const card = document.querySelector('[data-product]');
        if (card) {
            const productId = card.getAttribute('data-product');
            const productName = card.getAttribute('data-name');
            const productPrice = parseFloat(card.getAttribute('data-price'));
            addToCart(productId, productName, productPrice);
        }
    });
}

// Handle "Buy" button
let buy = document.getElementById("Buy");
if (buy) {
    buy.addEventListener("click", function() {
        alert("Дякуємо за покупку!=)");
    });
}

// ============== DISPLAY CART COUNT IN NAVBAR ==============
function updateCartCount() {
    const count = getCartCount();
    const cartElements = document.querySelectorAll('.basket_item');
    cartElements.forEach(el => {
        el.textContent = count;
    });
}

// Update cart count when page loads
document.addEventListener('DOMContentLoaded', updateCartCount);
