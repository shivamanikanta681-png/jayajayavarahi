import confetti from 'canvas-confetti';
import { init3DShowroom } from './showroom3d.js';

// Base64 Product Images supplied by user
const base64Images = [
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIACEAPAMBIgACEQEDEQH/xAAuAAACAwEAAAAAAAAAAAAAAAAABAIDBQEBAQEBAQAAAAAAAAAAAAAAAAACAQP/2gAIAQEAAT8AFuB6O6xscMxXRirOdjfUDa1uc1mo2tgvbGuc8fYQymgKkAYdA5AD//EACcQAAICAQMCBgMBAAAAAAAAAAECAAMEERIxISIQEzJBUWEUI0JT/9oACAEBAAE/AMh3spV/eJY5EWy0Q5tqHqsOW5X0x77SNNSBKhrYs8rJt612bfmDaGZGJ+phUK4dmlNeoJNQAllFTa765jVJa1tZ/gzIwwrhVDEmNjtjnv4I6GUqjL3dCPvmUqK9y3VA9eZ+QE1FaAQWXmxnBGh+4tuQ3b2mKTSLCwXeYWya+rsdX4j2MR5dgJBHJl7fsPtFYkaOgM317CpqGk1o/wAhFvRfTWAYLO8sFXrN580sw1l1ht2jiPjh21ME+fAcxuYeR4//xAAbEQEAAwADAQAAAAAAAAAAAAABAAIRECAhUf/aAAgBAgEBPwA+EBmWlarAcmPHu9f/xAAeEQABAwQDAAAAAAAAAAAAAAABAAIRAxIxUSBSYf/aAAgBAwEBPwCnAbc7CdUYcAq+lGinlsjUIkdpV7dIlAtA94//2Q==",
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIACEAPAMBIgACEQEDEQH/xAAvAAACAwEAAAAAAAAAAAAAAAAABAIDBQEBAQEBAQEAAAAAAAAAAAAAAAECAwAE/9oADAMBAAIQAxAAAADsqORs27hcHUnjz189pHgsrXSVG1sHNY0FGVZUXDMB7TvDCs2IaKGgFR//xAAoEAACAgEDAgUFAQAAAAAAAAABAgADEQQSITFBEzJCUXEFIjM0coH/2gAIAQEAAT8Ap12KQoSHW6gWbcCV6xjbl8Qauru8XW5sKbSZbePfH+8y0njI5lflmkXFLN6N0Zt7bsxQCSe4ilz0HMrbZdv7iVKlztY+SwPSXsGYMBA7ADE03GmdU9+Zt3MdtZm1i+3HfmbznpiJRe7cITEotouPx1jsfEzC4OMmaUArb92DiLvRWbjdEp8QHaMZOTDpFLZyd0dzQVUdhNTcSuAeCIp5nhK3O3Mr8jzsJpOpg/OfifVfTLv06v5idBKvLP/EACERAAICAQIHAAAAAAAAAAAAAAACAREDEjEQMjNBUXFy/9oACAECAQE/AGuiGJxVFnYeI1tAulLiR2ao8UbQZOo3sbmX7H24f//EAB0RAAIDAAIDAAAAAAAAAAAAAAECAAMRMkExcYL/2gAIAQMBAT8ARVY5Gpwkb1sDjcAncRiADLGaxtlagkzCScEXgvqDx8yrlOzP/9k=",
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIADwAIQMBIgACEQEDEQH/xAAuAAADAQEBAAAAAAAAAAAAAAAAAwQBAgUBAQEBAQAAAAAAAAAAAAAAAAIDAQD/2gAIAQEAAT8AGKc/KTt7XjnHHbklkij6W52jyAayrpNjrVOnbo03PEfxc5eW2j0D0hcFf/EACgQAAICAQIEBQUAAAAAAAAAAAECABEDEhCMEVFTIlH/2gAIAQEAAT8AthcnUYMWbiWVsDlKcZDk0zIC2PlvA7AfGF8akaiLMV75N5UZpirjbD8RMQPGsHpFoqN4OGALP8lJ+YEKIwPWIPrRAqmyYVVyaG837zJkZsoCsAOsGAvmBUx1Gn3GK1DVKTtB6fLuhFmDUDYK3UQFtXEIECiq6ShCo4lpsqQgsbXtcdeRdzUwI+ZqTK2kT0uX7xjbeGvqTPBoFB/UVFyMQwv3RMSYhSCvL/8QAHBEAAgIDAQEAAAAAAAAAAAAAAREAEBIhUQIT/9oACAECAQE/AEqZ5X00pl67BjiWUbW4a//EACERAAIBAwUAAAAAAAAAAAAAAQEDEVURMhMRIiMkFS/9oACAEDAQE/AFTq9kU1vyaKfQnlA1FZeZljTTEHfDraLqNyb5NyJwXk/9k=",
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIACEAPAMBIgACEQEDEQH/xAAxAAACAwEAAAAAAAAAAAAAAAAABAIDBQEGAQEBAQADAAAAAAAAAAAAAAACAQQAAwX/2gAIAQEAAT8AK2EbjzQjXTZoIs54S6vosnslty0wm0+csbkjIK0isrrWh5OvnALpyA35dfz4bc//8QAKhAAAgICAQAHCQAAAAAAAAAAAQIAAxEZEQUIjEyM4EFEBMjQUJRcXL/2gAIAQEAAT8AqQLkgjZOpXYawCBOtNw3mLabDvQjVIoySZcRxwDonEu9mmuv4nPMWlMdrIMQYd4vhwIEfh4tRXXnoyzky5J1iE8gn9QqhTtHUZKWZuRM+WuRg8pWygEYldoCuH1K7qkcnEruF1pAUy2pafU5jObQMPgfUQGmrRhJNjFh6RXZcgI0Ie44KMBF6K+CR+ZxKMePMSy612XWgMTqn3I5EtwrYe3cqAKe8d5l/hjMc95lPlCX+a/7n//EACERAAICAQIHAAAAAAAAAAAAAAABCRAhMVEDBBIyM0Fy/9oACAECAQE/AEnkehlakWqsTS9nVB4tFxdJM2RxfJP6Zucr2CP/xAAgEQACAQIHAQAAAAAAAAAAAAAAAQIQMgMREiExQVFx/9oACAEDAQE/AG6RJXZIcX4aX4JNdGzIWx+UxuTo/9k="
];

// Default Catalog Inventory
const defaultProducts = [
  { id: 1, name: "Premium Superhero Action Figure", category: "toys", price: 699, image: base64Images[0] },
  { id: 2, name: "Return Gift Pack (Set of 10 Boxes)", category: "gifts", price: 499, image: base64Images[2] },
  { id: 3, name: "Heavy Stainless Steel Kadai", category: "kitchen", price: 1299, image: base64Images[1] },
  { id: 4, name: "Premium Wooden Building Blocks", category: "toys", price: 899, image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=400" },
  { id: 5, name: "Set of 10 Decorative Brass Diya", category: "gifts", price: 799, image: base64Images[3] },
  { id: 6, name: "Non-Stick 3-Piece Cookware Set", category: "kitchen", price: 2199, image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=400" }
];

// Today's Special default structure
const defaultSpecialOffer = {
  title: "Heavy Stainless Steel 3-Piece Cookware Combo",
  desc: "Owner's Special Pick: Complete kitchen set including Kadai, Frypan, and Saucepot with lid. High durability premium induction base.",
  oldPrice: "₹2,999",
  newPrice: "₹1,899",
  image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=600"
};

const BUCKET_URL = "https://kvdb.io/JayaJayaVarahiToys_Bucket_2026_Key/products";
const SPECIAL_URL = "https://kvdb.io/JayaJayaVarahiToys_Bucket_2026_Key/special_offer";
const SPECIAL_ENABLED_URL = "https://kvdb.io/JayaJayaVarahiToys_Bucket_2026_Key/special_offer_enabled";

// Global App States
let products = JSON.parse(localStorage.getItem('varahi_products')) || defaultProducts;
let specialOffer = JSON.parse(localStorage.getItem('varahi_special')) || defaultSpecialOffer;
let cart = [];
let leads = JSON.parse(localStorage.getItem('varahi_leads')) || [];
let activeUserPhone = null;

async function syncCloudProducts() {
  try {
    const res = await fetch(BUCKET_URL);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        // Compare with local storage to avoid redrawing if nothing changed
        const currentLocal = localStorage.getItem('varahi_products');
        const incomingString = JSON.stringify(data);
        if (currentLocal !== incomingString) {
          products = data;
          localStorage.setItem('varahi_products', incomingString);
          renderCatalog(document.querySelector('.filter-tab.active')?.getAttribute('data-category') || 'all');
          if (sessionStorage.getItem('admin_logged_in')) {
            populateInventoryTable();
          }
        }
      }
    }
  } catch (err) {
    console.warn("Could not sync products from cloud, using offline cache:", err);
  }
}

async function saveProductsToCloud() {
  try {
    localStorage.setItem('varahi_products', JSON.stringify(products));
    await fetch(BUCKET_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(products)
    });
  } catch (err) {
    console.error("Error saving products to cloud DB:", err);
  }
}

async function syncCloudSpecial() {
  try {
    const res = await fetch(SPECIAL_URL);
    if (res.ok) {
      const data = await res.json();
      if (data && data.title) {
        const currentLocalSpecial = localStorage.getItem('varahi_special');
        const incomingString = JSON.stringify(data);
        if (currentLocalSpecial !== incomingString) {
          specialOffer = data;
          localStorage.setItem('varahi_special', incomingString);
          renderSpecialOffer();
        }
      }
    }
    const resEnabled = await fetch(SPECIAL_ENABLED_URL);
    if (resEnabled.ok) {
      const enabledVal = await resEnabled.json();
      const currentLocalEnabled = localStorage.getItem('varahi_special_enabled');
      const incomingString = JSON.stringify(enabledVal);
      if (currentLocalEnabled !== incomingString) {
        localStorage.setItem('varahi_special_enabled', incomingString);
        renderSpecialOffer();
      }
    }
  } catch (err) {
    console.warn("Could not sync special offer from cloud:", err);
  }
}

async function saveSpecialToCloud(isEnabled) {
  try {
    localStorage.setItem('varahi_special', JSON.stringify(specialOffer));
    localStorage.setItem('varahi_special_enabled', JSON.stringify(isEnabled));
    
    await fetch(SPECIAL_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(specialOffer)
    });
    
    await fetch(SPECIAL_ENABLED_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(isEnabled)
    });
  } catch (err) {
    console.error("Error saving special offer to cloud DB:", err);
  }
}

// Initialize Web Application
document.addEventListener('DOMContentLoaded', () => {
  // 1. Initial Render
  renderCatalog('all');
  renderSpecialOffer();
  setupReviewsSlider();
  initLoyaltyUI();
  
  // Sync Cloud Database (KVdb)
  syncCloudProducts();
  syncCloudSpecial();

  // Periodically check for remote additions, removals or updates
  setInterval(() => {
    syncCloudProducts();
    syncCloudSpecial();
  }, 12000);

  // Splash Screen Explore Transition
  const exploreBtn = document.getElementById('explore-store-btn');
  if (exploreBtn) {
    exploreBtn.addEventListener('click', () => {
      // 1. Fade out the central buttons card
      document.getElementById('explore-overlay-btn-container').style.opacity = '0';
      
      // 2. Open the sliding doors (left & right)
      document.querySelector('.splash-panel.left').style.transform = 'translateX(-100%)';
      document.querySelector('.splash-panel.right').style.transform = 'translateX(100%)';
      
      // 3. Trigger Camera Flash after 1 second (as doors part)
      setTimeout(() => {
        const flash = document.getElementById('camera-flash');
        flash.style.opacity = '1';
        
        setTimeout(() => {
          flash.style.opacity = '0';
          // Fade out the entire splash container
          document.getElementById('splash-screen').style.opacity = '0';
          
          // Trigger grand welcome confetti
          confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
          
          // 4. Hide splash screen DOM entirely after fade completes
          setTimeout(() => {
            document.getElementById('splash-screen').style.display = 'none';
          }, 800);
        }, 120);
      }, 1000);
    });
  }
  
  // Initialize 3D Showroom and link selector to catalog
  init3DShowroom((selectedCategory) => {
    // Select category tab
    const tabs = document.querySelectorAll('.filter-tab');
    tabs.forEach(tab => {
      if (tab.getAttribute('data-category') === selectedCategory) {
        tab.click();
      }
    });
    // Smooth scroll to catalog
    document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.8 } });
  });

  // 2. Setup Catalog Filter Actions
  const filterTabs = document.querySelectorAll('.filter-tab');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      filterTabs.forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');
      renderCatalog(e.target.getAttribute('data-category'));
    });
  });

  // Search input filter
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const activeTab = document.querySelector('.filter-tab.active').getAttribute('data-category');
    renderCatalog(activeTab, query);
  });

  // Sort dropdown change filter
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      const activeTab = document.querySelector('.filter-tab.active').getAttribute('data-category');
      const query = searchInput.value.toLowerCase();
      renderCatalog(activeTab, query);
    });
  }

  // 3. Lead Discount Modal Trigger (Shows after 5 seconds if not already submitted)
  if (!localStorage.getItem('lead_collected')) {
    setTimeout(() => {
      document.getElementById('discount-modal').classList.add('active');
    }, 5000);
  }

  // Bind forms & modal closers
  setupFormBindings();
  setupAdminDashboard();
  setupPrintFlyer();
});

// Render Catalog Grid
function renderCatalog(category, searchQuery = '') {
  const container = document.getElementById('product-grid-container');
  if (!container) return;

  container.innerHTML = '';
  let filtered = products.filter(p => {
    const matchesCat = (category === 'all' || p.category === category);
    const matchesSearch = p.name.toLowerCase().includes(searchQuery);
    return matchesCat && matchesSearch;
  });

  // Sort logic
  const sortSelect = document.getElementById('sort-select');
  const sortBy = sortSelect ? sortSelect.value : 'default';
  if (sortBy === 'low-high') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'high-low') {
    filtered.sort((a, b) => b.price - a.price);
  }

  if (filtered.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding: 40px; color:var(--text-muted)">No products found.</div>`;
    return;
  }

  filtered.forEach(p => {
    const card = document.createElement('div');
    card.className = 'glass-panel product-card';
    card.innerHTML = `
      <div class="product-card-image">
        <span class="product-tag">${p.category.toUpperCase()}</span>
        <img src="${p.image}" alt="${p.name}">
      </div>
      <div class="product-card-details">
        <div>
          <h3 class="product-card-title">${p.name}</h3>
          <p class="product-card-price">₹${p.price}</p>
        </div>
        <button class="glass-btn product-card-btn" data-id="${p.id}"><i class="fa-solid fa-cart-plus"></i> Pre-Order</button>
      </div>
    `;
    container.appendChild(card);
  });

  // Add click to order buttons
  container.querySelectorAll('.product-card-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const prodId = parseInt(e.currentTarget.getAttribute('data-id'));
      const product = products.find(p => p.id === prodId);
      if (product) addToCart(product);
    });
  });
}

// Render Special Offer Box
function renderSpecialOffer() {
  const isEnabled = JSON.parse(localStorage.getItem('varahi_special_enabled')) !== false;
  const specialSection = document.getElementById('specials');
  if (specialSection) {
    specialSection.style.display = isEnabled ? 'block' : 'none';
  }

  document.getElementById('special-offer-title').textContent = specialOffer.title;
  document.getElementById('special-offer-desc').textContent = specialOffer.desc;
  document.getElementById('special-offer-oldprice').textContent = specialOffer.oldPrice;
  document.getElementById('special-offer-newprice').textContent = specialOffer.newPrice;
  document.getElementById('special-offer-img').src = specialOffer.image;
}

// Add Item to Cart
function addToCart(product) {
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCartUI();
  // Animation visual feedback
  confetti({ particleCount: 30, spread: 40, colors: ['#ff6b00', '#ffd700'] });
  document.getElementById('cart-drawer-container').classList.add('active');
}

// Update Cart side drawer
function updateCartUI() {
  const badge = document.getElementById('cart-badge-count');
  const cartList = document.getElementById('cart-drawer-items-list');
  const totalLabel = document.getElementById('cart-total-mrp');
  
  const totalCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  badge.textContent = totalCount;
  
  cartList.innerHTML = '';
  let totalPrice = 0;

  if (cart.length === 0) {
    cartList.innerHTML = `<div style="text-align:center; padding:50px 0; color:var(--text-muted);"><i class="fa-solid fa-basket-shopping" style="font-size:3rem; margin-bottom:15px; display:block; opacity:0.3;"></i> Your cart is empty</div>`;
    totalLabel.textContent = '₹0';
    return;
  }

  cart.forEach(item => {
    totalPrice += item.price * item.quantity;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${item.image}" class="cart-item-img">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">₹${item.price}</div>
      </div>
      <div class="cart-item-controls">
        <button class="cart-qty-btn decrease-qty" data-id="${item.id}">-</button>
        <span>${item.quantity}</span>
        <button class="cart-qty-btn increase-qty" data-id="${item.id}">+</button>
      </div>
    `;
    cartList.appendChild(div);
  });

  totalLabel.textContent = `₹${totalPrice}`;

  // Re-attach qty buttons click listeners
  cartList.querySelectorAll('.decrease-qty').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.target.getAttribute('data-id'));
      const index = cart.findIndex(item => item.id === id);
      if (index !== -1) {
        if (cart[index].quantity > 1) {
          cart[index].quantity--;
        } else {
          cart.splice(index, 1);
        }
        updateCartUI();
      }
    });
  });

  cartList.querySelectorAll('.increase-qty').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.target.getAttribute('data-id'));
      const index = cart.find(item => item.id === id);
      if (index) {
        index.quantity++;
        updateCartUI();
      }
    });
  });
}

// Loyalty Stamp Cards Initialization & Mechanics
function initLoyaltyUI() {
  const container = document.getElementById('stamp-grid-container');
  if (!container) return;

  container.innerHTML = '';
  
  // Render 10 stamp slots
  let stampsCount = 0;
  if (activeUserPhone) {
    const members = JSON.parse(localStorage.getItem('varahi_loyalty_members')) || {};
    stampsCount = members[activeUserPhone] || 0;
  }

  for (let i = 1; i <= 10; i++) {
    const stamp = document.createElement('div');
    stamp.className = `loyalty-stamp ${i <= stampsCount ? 'stamped' : ''}`;
    stamp.innerHTML = i <= stampsCount ? `<i class="fa-solid fa-check"></i>` : i;
    container.appendChild(stamp);
  }

  const statusLabel = document.getElementById('loyalty-points-summary');
  if (activeUserPhone) {
    statusLabel.innerHTML = `Welcome back! You have <strong>${stampsCount}/10</strong> stamps collected. Every 10th stamp grants a free kitchenware or toy gift!`;
  } else {
    statusLabel.innerHTML = `Enter your phone number to check stamps and see if you have won birthday rewards!`;
  }
}

// Customer Reviews slider setup
function setupReviewsSlider() {
  const track = document.getElementById('reviews-slider-track');
  const prevBtn = document.getElementById('review-prev');
  const nextBtn = document.getElementById('review-next');
  if (!track || !prevBtn || !nextBtn) return;

  let currentSlide = 0;
  const slideCount = track.children.length;

  function updateSlidePosition() {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
  }

  prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide > 0) ? currentSlide - 1 : slideCount - 1;
    updateSlidePosition();
  });

  nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide < slideCount - 1) ? currentSlide + 1 : 0;
    updateSlidePosition();
  });
}

// Event Bindings for lead captures and order requests
function setupFormBindings() {
  // Drawer Toggles
  document.getElementById('cart-toggle-btn').addEventListener('click', () => {
    document.getElementById('cart-drawer-container').classList.add('active');
  });
  document.getElementById('cart-drawer-close').addEventListener('click', () => {
    document.getElementById('cart-drawer-container').classList.remove('active');
  });

  // Modal Closers
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('active');
    });
  });

  document.getElementById('admin-login-close').addEventListener('click', () => {
    document.getElementById('admin-login-modal').classList.remove('active');
  });
  document.getElementById('discount-modal-close').addEventListener('click', () => {
    document.getElementById('discount-modal').classList.remove('active');
  });

  // Lead Collection Popup Submission
  const leadForm = document.getElementById('lead-collect-form');
  leadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('lead-name').value;
    const phone = document.getElementById('lead-phone').value;
    
    leads.push({ name, phone, date: new Date().toLocaleDateString() });
    localStorage.setItem('varahi_leads', JSON.stringify(leads));
    localStorage.setItem('lead_collected', 'true');

    // Visual feedback
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    
    document.getElementById('lead-collect-form').style.display = 'none';
    document.getElementById('coupon-display-container').style.display = 'block';
  });

  // Loyalty Program login logic
  document.getElementById('loyalty-check-btn').addEventListener('click', () => {
    const phone = document.getElementById('loyalty-phone-input').value.trim();
    if (!phone) return;
    
    activeUserPhone = phone;
    document.getElementById('loyalty-member-id').textContent = `ID: +91-${phone.substring(Math.max(0, phone.length - 4))}`;

    const members = JSON.parse(localStorage.getItem('varahi_loyalty_members')) || {};
    if (members[phone] === undefined) {
      members[phone] = 1; // Default first stamp
      localStorage.setItem('varahi_loyalty_members', JSON.stringify(members));
    }
    
    initLoyaltyUI();
    confetti({ particleCount: 50, spread: 40 });
  });

  // Simulate loyalty card purchase stamp
  document.getElementById('simulate-purchase-stamp-btn').addEventListener('click', () => {
    if (!activeUserPhone) {
      alert("Please access your loyalty card with your phone number first!");
      return;
    }
    const members = JSON.parse(localStorage.getItem('varahi_loyalty_members')) || {};
    let stamps = members[activeUserPhone] || 0;
    stamps++;
    if (stamps > 10) {
      stamps = 1;
      alert("Congratulations! You completed 10 stamps! Claim your free gift at the store and start a new reward card!");
      confetti({ particleCount: 150, spread: 100, colors: ['#ffd700'] });
    }
    members[activeUserPhone] = stamps;
    localStorage.setItem('varahi_loyalty_members', JSON.stringify(members));
    initLoyaltyUI();
    confetti({ particleCount: 40, spread: 40 });
  });

  // Shopping Cart WhatsApp Checkout
  document.getElementById('cart-whatsapp-checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) return;

    const time = document.getElementById('cart-pickup-time').value;
    let text = `*JAYA JAYA VARAHI TOYS - PRE-ORDER PICKUP REQUEST*\n\n`;
    text += `Hello, I would like to pre-order these items for store pickup:\n`;
    
    let total = 0;
    cart.forEach(item => {
      text += `- *${item.name}* (Qty: ${item.quantity}) - ₹${item.price * item.quantity}\n`;
      total += item.price * item.quantity;
    });

    text += `\n*Grand Total:* ₹${total}\n`;
    text += `*Scheduled Pickup Time:* ${time}\n\n`;
    text += `Please confirm my order. Thank you!`;

    const shopPhone = "917569304410"; // Configured shop number
    const encoded = encodeURIComponent(text);
    
    // Increment loyalty stamp if logged in
    if (activeUserPhone) {
      const members = JSON.parse(localStorage.getItem('varahi_loyalty_members')) || {};
      let stamps = members[activeUserPhone] || 0;
      stamps = (stamps >= 10) ? 1 : stamps + 1;
      members[activeUserPhone] = stamps;
      localStorage.setItem('varahi_loyalty_members', JSON.stringify(members));
      initLoyaltyUI();
    }

    // Reset cart
    cart = [];
    updateCartUI();
    document.getElementById('cart-drawer-container').classList.remove('active');

    window.open(`https://wa.me/${shopPhone}?text=${encoded}`, '_blank');
  });

  // Today's special order checkout shortcut
  document.getElementById('add-special-to-cart').addEventListener('click', () => {
    const item = {
      id: 9999, // Special ID
      name: `[Today's Special] ${specialOffer.title}`,
      price: parseInt(specialOffer.newPrice.replace(/[^0-9]/g, '')),
      image: specialOffer.image
    };
    addToCart(item);
  });

  // Feedback Form WhatsApp submission
  document.getElementById('customer-feedback-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('feedback-name').value;
    const desc = document.getElementById('feedback-message').value;
    
    // Get active stars
    const activeStars = document.querySelectorAll('#feedback-stars-container i.active').length;
    
    let text = `*CUSTOMER FEEDBACK SUBMISSION - JAYA JAYA VARAHI TOYS*\n\n`;
    text += `*Name:* ${name}\n`;
    text += `*Rating:* ${activeStars}/5 Stars\n`;
    text += `*Comments:* ${desc}\n`;

    const encoded = encodeURIComponent(text);
    const shopPhone = "917569304410";
    window.open(`https://wa.me/${shopPhone}?text=${encoded}`, '_blank');
  });

  // Handle Stars inside feedback form
  const feedbackStars = document.querySelectorAll('#feedback-stars-container i');
  feedbackStars.forEach(star => {
    star.addEventListener('click', (e) => {
      const currentRating = parseInt(e.target.getAttribute('data-rating'));
      feedbackStars.forEach(s => {
        const rating = parseInt(s.getAttribute('data-rating'));
        if (rating <= currentRating) {
          s.classList.add('active');
        } else {
          s.classList.remove('active');
        }
      });
    });
  });
}

// Admin Dashboard Management Portal
function setupAdminDashboard() {
  // Navigation trigger
  document.getElementById('admin-nav-link').addEventListener('click', (e) => {
    e.preventDefault();
    // Check if authenticated
    if (sessionStorage.getItem('admin_logged_in')) {
      document.getElementById('admin').style.display = 'block';
      document.getElementById('admin').scrollIntoView({ behavior: 'smooth' });
    } else {
      document.getElementById('admin-login-modal').classList.add('active');
    }
  });

  // Home page Shortcut edit special trigger
  document.getElementById('admin-special-edit-btn').addEventListener('click', () => {
    if (sessionStorage.getItem('admin_logged_in')) {
      document.getElementById('admin').style.display = 'block';
      document.getElementById('admin').scrollIntoView({ behavior: 'smooth' });
      // Switch tab to special offer
      document.querySelectorAll('.admin-nav-item').forEach(item => {
        if (item.getAttribute('data-pane') === 'special-offer') item.click();
      });
    } else {
      document.getElementById('admin-login-modal').classList.add('active');
    }
  });

  document.getElementById('footer-admin-login-link').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('admin-login-modal').classList.add('active');
  });

  // Form submit dashboard login validation
  document.getElementById('admin-login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const pass = document.getElementById('admin-pass-input').value;
    if (pass === 'admin123') {
      sessionStorage.setItem('admin_logged_in', 'true');
      document.getElementById('admin-login-error').style.display = 'none';
      document.getElementById('admin-login-modal').classList.remove('active');
      document.getElementById('admin').style.display = 'block';
      document.getElementById('admin').scrollIntoView({ behavior: 'smooth' });
      // Clear password field
      document.getElementById('admin-pass-input').value = '';
      confetti({ particleCount: 50, spread: 40 });
      // Load tables/admin UI details
      populateLeadsTable();
      populateFestivalMessage();
      populateInventoryTable();
    } else {
      document.getElementById('admin-login-error').style.display = 'block';
    }
  });

  // Dashboard Tab selection switching
  const tabs = document.querySelectorAll('.admin-nav-item');
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      tabs.forEach(t => t.classList.remove('active'));
      e.currentTarget.classList.add('active');
      
      const paneId = e.currentTarget.getAttribute('data-pane');
      document.querySelectorAll('.admin-pane').forEach(p => p.classList.remove('active'));
      document.getElementById(`pane-${paneId}`).classList.add('active');
      
      if (paneId === 'manage-products') {
        populateInventoryTable();
      }
    });
  });

  // Form add catalog product
  document.getElementById('admin-add-product-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('admin-prod-name').value;
    const category = document.getElementById('admin-prod-cat').value;
    const price = parseInt(document.getElementById('admin-prod-price').value);
    const fileInput = document.getElementById('admin-prod-img-file');
    
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      
      reader.onload = function(event) {
        const imageBase64 = event.target.result;
        
        const newProduct = {
          id: Date.now(),
          name,
          category,
          price,
          image: imageBase64
        };

        products.push(newProduct);
        saveProductsToCloud();
        renderCatalog('all');
        
        // Clear Form
        document.getElementById('admin-prod-name').value = '';
        document.getElementById('admin-prod-price').value = '';
        fileInput.value = '';
        
        alert("New product has been successfully added to catalog with your uploaded image!");
        confetti({ particleCount: 80, spread: 60 });
      };
      
      reader.readAsDataURL(file);
    } else {
      alert("Please choose an image file to upload!");
    }
  });

  // Edit Today's Special Offer Form
  const specialForm = document.getElementById('admin-edit-special-form');
  // Preset fields values
  document.getElementById('admin-special-title').value = specialOffer.title;
  document.getElementById('admin-special-desc').value = specialOffer.desc;
  document.getElementById('admin-special-oldprice').value = specialOffer.oldPrice;
  document.getElementById('admin-special-newprice').value = specialOffer.newPrice;
  document.getElementById('admin-special-img').value = specialOffer.image;
  document.getElementById('admin-special-enabled').checked = JSON.parse(localStorage.getItem('varahi_special_enabled')) !== false;

  specialForm.addEventListener('submit', (e) => {
    e.preventDefault();
    specialOffer = {
      title: document.getElementById('admin-special-title').value,
      desc: document.getElementById('admin-special-desc').value,
      oldPrice: document.getElementById('admin-special-oldprice').value,
      newPrice: document.getElementById('admin-special-newprice').value,
      image: document.getElementById('admin-special-img').value
    };
    
    const isEnabled = document.getElementById('admin-special-enabled').checked;
    saveSpecialToCloud(isEnabled);
    renderSpecialOffer();
    alert("Today's Special Offer has been updated successfully on the cloud!");
    confetti({ particleCount: 50 });
  });

  // Festival selector campaign greetings
  const festivalSelect = document.getElementById('admin-festival-select');
  festivalSelect.addEventListener('change', populateFestivalMessage);

  // Send Greetings via WhatsApp Campaign
  document.getElementById('admin-send-bulk-greetings-btn').addEventListener('click', () => {
    const text = document.getElementById('admin-festival-preview').value;
    const encoded = encodeURIComponent(text);
    
    if (leads.length === 0) {
      alert("You have no collected customer leads yet!");
      return;
    }

    // Opens text links to WhatsApp chat for collected phone numbers
    // In a production server, this could hook to a bulk WhatsApp API, 
    // for this responsive client app, it loads the first contact or prompts options
    const firstLead = leads[0];
    alert(`Generating chat campaign. Sending message to: ${firstLead.name} (${firstLead.phone})`);
    window.open(`https://wa.me/91${firstLead.phone}?text=${encoded}`, '_blank');
  });

  // Logout admin
  document.getElementById('admin-logout-btn').addEventListener('click', () => {
    sessionStorage.removeItem('admin_logged_in');
    document.getElementById('admin').style.display = 'none';
    alert("You have logged out of the Administration workspace.");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Populate Bulk Festival Messages
function populateFestivalMessage() {
  const fest = document.getElementById('admin-festival-select').value;
  const area = document.getElementById('admin-festival-preview');
  if (!area) return;

  const url = window.location.href;
  let text = '';

  switch (fest) {
    case 'Diwali':
      text = `🪔 *HAPPY DIWALI FROM JAYA JAYA VARAHI TOYS!* 🪔\n\nDear Customer, light up your home with our premium stainless steel kitchenware sets and beautiful return gifts. Claim 10% Off on your Diwali shopping!\n👉 Pre-order here: ${url}`;
      break;
    case 'Ugadi':
      text = `🌸 *HAPPY UGADI FROM JAYA JAYA VARAHI TOYS* 🌸\n\nWishing you a flavorful Telugu New Year! Enjoy new arrivals in steel kitchen utilities and return gifts. Browse catalog and get home delivery/store pickup.\n👉 Link: ${url}`;
      break;
    case 'Dussehra':
      text = `🏹 *SHUBHA DUSSEHRA SPECIAL OFFERS* 🏹\n\nCelebrate Victory with Jaya Jaya Varahi Toys. Special festival discounts active on cookware combos and kids premium play sets!\n👉 Check Offers: ${url}`;
      break;
    case 'Sankranti':
      text = `🌾 *MAKAR SANKRANTI CELEBRATIONS* 🌾\n\nHappy Makar Sankranti! Fresh collection of brass return gift diyas and heavy kitchen cooking pots now in store. Pre-order now.\n👉 Link: ${url}`;
      break;
    case 'Birthday':
      text = `🎉 *HAPPY BIRTHDAY FROM JAYA JAYA VARAHI TOYS!* 🎉\n\nDear customer, we wish you a fantastic year ahead! Show this message at our store in Peerzadiguda to redeem your special birthday gift and extra 15% discount on toys or kitchen utilities!\n👉 Details: ${url}`;
      break;
  }
  area.value = text;
}

// Populate Admin Leads Table
function populateLeadsTable() {
  const container = document.getElementById('admin-leads-table-container');
  const countSpan = document.getElementById('leads-count');
  if (!container || !countSpan) return;

  countSpan.textContent = leads.length;

  if (leads.length === 0) {
    container.innerHTML = `<p style="text-align:center; padding: 20px; color:var(--text-muted);">No customer leads registered yet.</p>`;
    return;
  }

  let html = `
    <table style="width:100%; border-collapse:collapse; text-align:left; font-size:0.9rem;">
      <thead>
        <tr style="border-bottom: 2px solid rgba(255, 107, 0, 0.3)">
          <th style="padding: 10px;">Name</th>
          <th style="padding: 10px;">WhatsApp Phone</th>
          <th style="padding: 10px;">Registered Date</th>
        </tr>
      </thead>
      <tbody>
  `;

  leads.forEach(l => {
    html += `
      <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05)">
        <td style="padding: 10px;">${l.name}</td>
        <td style="padding: 10px;">+91-${l.phone}</td>
        <td style="padding: 10px;">${l.date || 'N/A'}</td>
      </tr>
    `;
  });

  html += `</tbody></table>`;
  container.innerHTML = html;
}

// Populate Admin Product Inventory Table for Stock Removal
function populateInventoryTable() {
  const container = document.getElementById('admin-inventory-table-container');
  if (!container) return;

  if (products.length === 0) {
    container.innerHTML = `<p style="text-align:center; padding: 20px; color:var(--text-muted);">No stock items currently active.</p>`;
    return;
  }

  let html = `
    <table style="width:100%; border-collapse:collapse; text-align:left; font-size:0.9rem;">
      <thead>
        <tr style="border-bottom: 2px solid rgba(255, 107, 0, 0.3)">
          <th style="padding: 10px;">Product Name</th>
          <th style="padding: 10px;">Category</th>
          <th style="padding: 10px;">Price</th>
          <th style="padding: 10px; text-align:center;">Action</th>
        </tr>
      </thead>
      <tbody>
  `;

  products.forEach(p => {
    html += `
      <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05)">
        <td style="padding: 10px; font-weight:600;">${p.name}</td>
        <td style="padding: 10px; color:var(--accent-gold);">${p.category.toUpperCase()}</td>
        <td style="padding: 10px;">₹${p.price}</td>
        <td style="padding: 10px; text-align:center;">
          <button class="glass-btn remove-stock-btn" data-id="${p.id}" style="padding: 6px 12px; font-size: 0.75rem; background: rgba(255,0,0,0.1); border-color: red; color: white;">
            <i class="fa-solid fa-trash-can"></i> Remove
          </button>
        </td>
      </tr>
    `;
  });

  html += `</tbody></table>`;
  container.innerHTML = html;

  // Add click handlers to delete buttons
  container.querySelectorAll('.remove-stock-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.currentTarget.getAttribute('data-id'));
      if (confirm("Are you sure you want to remove this item from your stock?")) {
        products = products.filter(p => p.id !== id);
        saveProductsToCloud();
        renderCatalog('all');
        populateInventoryTable();
      }
    });
  });
}

// Print Flyer template logic
function setupPrintFlyer() {
  const triggerBtn = document.getElementById('print-flyer-btn');
  const footerBtn = document.getElementById('footer-print-code-link');
  if (!triggerBtn || !footerBtn) return;

  const handlePrint = (e) => {
    e.preventDefault();
    
    const qrContainer = document.getElementById('print-qr-container');
    if (qrContainer) {
      // Get the clean current URL of the website
      const siteUrl = window.location.origin + window.location.pathname;
      // Fetch a real scanable QR code pointing to this URL
      const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(siteUrl)}&size=250x250&color=ff6b00`;
      
      qrContainer.innerHTML = `
        <img src="${qrCodeUrl}" alt="Jaya Jaya Varahi Toys QR Code" style="width:100%; height:100%; object-fit:contain;" />
      `;
    }
    
    // Small timeout to let the QR image finish rendering before printing
    setTimeout(() => {
      window.print();
    }, 450);
  };

  triggerBtn.addEventListener('click', handlePrint);
  footerBtn.addEventListener('click', handlePrint);
}
