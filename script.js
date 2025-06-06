// Amazon Clone JavaScript Functions

// Navigation functions
function openProductPage(category) {
    window.location.href = `products.html?category=${category}`;
}

// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    const searchIcon = document.querySelector('.search-icon');
    
    if (searchInput && searchIcon) {
        searchIcon.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
});

function performSearch() {
    const searchInput = document.querySelector('.search-input');
    const query = searchInput.value.trim();
    if (query) {
        window.location.href = `search.html?q=${encodeURIComponent(query)}`;
    }
}

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }
}

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification('Item added to cart!');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', updateCartCount);

// Smooth scrolling for navigation
function smoothScroll(target) {
    document.querySelector(target).scrollIntoView({
        behavior: 'smooth'
    });
}

// Scroll to top function for footer
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Form validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^\d{10}$/;
    return re.test(phone.replace(/\D/g, ''));
}
