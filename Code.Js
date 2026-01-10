function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function getCart() {
    let cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

document.getElementById('More').addEventListener('click', function() {
    var moreInfo = document.getElementById('moreInfo');
    if (moreInfo.style.display === 'none') {
        moreInfo.style.display = 'block';
    } else {
        moreInfo.style.display = 'none';
    }
});

document.getElementById('ToTheCard').addEventListener('click', function() {
    let cart = getCart();
    let product = { name: "Хліб Домашній Білий", price: 22.45, quantity: 1 };
    // Check if already in cart, increase quantity
    let existing = cart.find(item => item.name === product.name);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push(product);
    }
    saveCart(cart);
    alert('Товар додано до кошика!');
});

document.getElementById('Buy').addEventListener('click', function() {
    alert('Товар куплено успішно!');
});