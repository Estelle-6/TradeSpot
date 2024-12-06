const logo = document.getElementById('logo');
const logoContainer = document.getElementById('logo-container'); // Or a container
logoContainer.addEventListener('mouseover', () => {
  logo.src = 'hover-logo.jpg';
});

logoContainer.addEventListener('mouseout', () => {
  logo.src = 'normal-logo.jpg';
});

//Simulate user login status  (replace with actual authentication)
const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; //Get from Local Storage
const userType = localStorage.getItem('userType') || 'buyer'; //Get from Local Storage

if (isLoggedIn) {
  document.body.classList.add('logged-in');
  document.getElementById('profile-link').textContent = `View ${userType} Profile`;
}
// Sample product data (replace with data fetched from your server)
/*const products = [
    { name: "Product 1", image: "product1.jpg", price: 25000 },
    { name: "Product 2", image: "product2.jpg", price: 50000 },
    { name: "Product 3", image: "product3.jpg", price: 100000 },
    // ... more products
  ];
  
  const productGrid = document.querySelector('.product-grid');
  
  products.forEach(product => {
    const productItem = document.createElement('div');
    productItem.classList.add('product-item');
    productItem.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
    `;
    productGrid.appendChild(productItem);
  });*/
  // Example of redirecting to profile page (replace with your actual routing)
document.getElementById('profile-link').addEventListener('click', function(event) {
    event.preventDefault();
    if (userType === 'buyer') {
      window.location.href = '/buyer-profile'; // Replace with actual buyer profile URL
    } else if (userType === 'seller'){
      window.location.href = '/seller-profile'; //Replace with actual seller profile URL
    } else {
      alert('Profile not found.');
    }
  });
  const sellerGrid = document.querySelector('.seller-grid');

// Sample seller data (REPLACE WITH DATA FROM YOUR BACKEND)
const sellers = [
  { name: "Seller A", image: "sellerA.jpg", products: ["Product X", "Product Y"] },
  { name: "Seller B", image: "sellerB.jpg", products: ["Product Z", "Product W"] },
  // ... more sellers
];

sellers.forEach(seller => {
  const sellerDiv = document.createElement('div');
  sellerDiv.classList.add('seller');
  sellerDiv.innerHTML = `
    <img src="${seller.image}" alt="${seller.name}">
    <h2>${seller.name}</h2>
    <ul class="product-list">
      ${seller.products.map(product => `<li>${product}</li>`).join('')}
    </ul>
  `;
  sellerGrid.appendChild(sellerDiv);
});