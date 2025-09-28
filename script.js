// create a cart
let cart = [];
if (localStorage.getItem("saga-v-cart")) {
  cart = JSON.parse(localStorage.getItem("saga-v-cart"));
}

// Mobile me[nu toggle
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("primary-nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}
// Respect reduced motion (no animations here yet, but this is where we gate them)
const prefersReduced = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;
// if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { /* no-op */}

//Order Summary 
// Sample order data
const orderItems = [
  { name: 'The Sun', price: 10, quantity: 1 },
  { name: 'The Fool', price: 10, quantity: 1},
];

function renderOrderSummary() {
  const itemList = document.getElementById('cart-items');
  const orderTotalSpan = document.getElementById('order-total');
  let total = 0;

  // Clear existing items
  itemList.innerHTML = '';

  // Add each item to the list
  orderItems.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = `${item.name} Bottle Size - $${(item.price * item.quantity).toFixed(2)}`;
    itemList.appendChild(listItem);
    total += item.price * item.quantity;
  });

  // Update the total
  orderTotalSpan.textContent = `$${total.toFixed(2)}`;
}

// Call the function to render the summary when the page loads
document.addEventListener('DOMContentLoaded', renderOrderSummary);

// Example of adding a new item (could be triggered by user action)
function addItemToOrder(name, price, quantity) {
  orderItems.push({ name, price, quantity });
  renderOrderSummary();}

  function show(shown, hidden){
    document.getElementById(shown).style.display='block';
    document.getElementById(hidden).style.display='none';
    return false;
  }

// Mocktail product details

const mocktailsArray = [
  {
    id: 1,
    name: "The Sun",
    desc: "Golden peach, honey, and vanilla blossom with sparkling water",
    flavor: ["Bright", "Uplifting", "Approachable"],
    price: 52.99,
    img: "assets/the-sun.jpg",
  },
  {
    id: 2,
    name: "The Siren",
    desc: "Sea salt, grapefruit, and rosemary",
    flavor: ["Savory", "Intriguing", "Adventurous"],
    price: 52.99,
    img: "assets/the-siren.jpg",
  },
  {
    id: 3, 
    name: "The Fool",
    desc: "Yuzu, Lime, and Green Apple",
    flavor: ["Tangy", "Playful", "Energizing"],
    price: 52.99,
    img: "assets/the-fool.jpg",
  },
  {
    id: 4,
    name: "The Magician",
    desc: "Blood orange, gentian root, and herbal botanicals",
    flavor: ["Complex", "Sophisticated", "Contemplative"],
    price: 52.99,
    img: "assets/the-magician.jpg",
  },
  {
    id: 5,
    name: "The Oracle",
    desc: "Tomato, black tea, and shiitake with subtle spice",
    flavor: ["Earthy", "Grounding", "Savory"],
    price: 52.99,
    img: "assets/the-oracle.jpg",
  }
];

// Modal View functionality

$(".view-product").on("click",function(e){
  const cardId = parseInt(e.target.dataset.mocktail); 
  const card = mocktailsArray.filter((x) => x.id === cardId)[0]; 
  updateProductDetailCard(card); 
  $("#product-detail").dialog("open");

});

$("#close-modal").on("click", function(){
    $("#shop-overlay").fadeOut(1000);
  $("#product-detail").dialog("close"); 
});

$("#product-detail").dialog({
      appendTo: 'body',
      autoOpen: false, 
      width: '75vw',
      modal: true,
      show: {
        effect: "fade",
        duration: 800
      },
      open: function(){
        $("#shop-overlay").fadeIn(800);
      },
      close: function(){
        $("#shop-overlay").fadeOut(800);
      },
      hide: {
        effect: "fade",
        duration: 1000
      },
    });


const updateProductDetailCard = (product) => {
  /*clear out content */ 
  $("#product-name").text(""); 
  $(".modal-price").text(""); 
  $("#flavors").text("");
  $(".product-qty").val(1); 


  $("#product-name").text(product.name); 
  $(".modal-price").text(`$${product.price} / bottle (750mL)`); 
  $(".modal-card").attr("id", `modal-${product.id}`); 
  let flavorsDiv = $("#flavors"); 
  for (let i=0;i < product.flavor.length; i++){
    flavorsDiv.append(
      `<div class="badge badge-pill modal-card-btn flavor-tag"> 
        ${product.flavor[i]}
      </div>`
    )
  }
  $("#description").text(product.desc); 
  $("#product-button").attr("data-mocktail", product.id); 
}

// shop button add to cart: 
$(".shop-btn").on("click", function(e){
  let product = {}; 
  const productId = parseInt(e.target.dataset.mocktail); 
  let existingProduct = cart.find(item => item.id === productId);
  let productQty = parseInt($(".product-qty").val());
  if (existingProduct){
    if (productQty){
      existingProduct.quantity+= productQty; 
    }else{
      existingProduct.quantity += 1; 
    }
  }else{
    product.id = productId; 
    product.quantity = 1; 
    cart.push(product); 
  }
  console.log("CURRENT CART", cart);
}); 

// === Cohesive enhancements ===
(function(){
  const STORAGE_KEY = "saga-v-cart";
  let cartData = [];
  try { cartData = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch(e){ cartData = []; }

  function updateCartCount(){
    const count = cartData.reduce((sum, item)=> sum + (item.qty || 1), 0);
    document.querySelectorAll('.cart-count').forEach(el => el.textContent = count ? `(${count})` : "");
  }
  updateCartCount();

  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', ()=>{
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }
})();
