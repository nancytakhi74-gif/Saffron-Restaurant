const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");

if (menu && nav) {
    menu.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
}

const topBtn = document.getElementById("topBtn");
window.onscroll = function () {
    if (topBtn) {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }
    }
};
if (topBtn) {
    topBtn.onclick = function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
}

const bookingForm = document.querySelector(".booking-form form");
if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
        e.preventDefault();
        alert("🎉 Your table has been booked successfully!");
        bookingForm.reset();
    });
}

const orderButtons = document.querySelectorAll(".order-btn");
orderButtons.forEach(function (button) {
    button.addEventListener("click", function (e) {
        e.preventDefault();
        alert("🍽️ Your order has been placed successfully!");
    });
});

/*========================= CART ==========================*/
let cart = [];
let total = 0;

const cartBtn = document.getElementById("cart-btn");
const cartPanel = document.getElementById("cart-panel");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");

if (cartBtn && cartPanel) {
    cartBtn.addEventListener("click", () => {
        cartPanel.classList.toggle("active");
    });
}

const buttons = document.querySelectorAll(".add-cart");
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const name = button.dataset.name;
        const price = Number(button.dataset.price);
        cart.push({name, price});
        updateCart();
    });
});

function updateCart(){
    if(!cartItems) return;
    cartItems.innerHTML = "";
    total = 0;
    cart.forEach((item,index)=>{
        total += item.price;
        cartItems.innerHTML += `
            <div class="cart-item">
                <div><h4>${item.name}</h4><p>₹${item.price}</p></div>
                <button onclick="removeItem(${index})">❌</button>
            </div>
        `;
    });
    if(cartTotal) cartTotal.innerText = total;
    if(cartCount) cartCount.innerText = cart.length;
}

function removeItem(index){
    cart.splice(index,1);
    updateCart();
}

const checkoutBtn = document.querySelector(".checkout-btn");
if(checkoutBtn){
    checkoutBtn.addEventListener("click", function () {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }
        alert("Order Placed Successfully!\n\nThank you for choosing Saffron Restaurant.");
        cart = [];
        updateCart();
        if(cartPanel) cartPanel.classList.remove("active");
    });
}

// YE PART FIX KIYA - agar close button nahi hai to error nahi aayega
const closeCart = document.getElementById("close-cart");
if(closeCart){
    closeCart.addEventListener("click", function () {
        cartPanel.classList.remove("active");
    });
}

// Bahar click karne se cart band
window.addEventListener("click", (e) => {
    if (!cartPanel.contains(e.target) && !cartBtn.contains(e.target)) {
        cartPanel.classList.remove("active");
    }
});