const sellerGrid = document.querySelector('.seller-grid');

const sellers = [
  {
    name: "Seller A",
    image: "sellerA.jpg",
    products: [
      { name: "Product 1", image: "productA1.jpg", price: 19.99 },
      { name: "Product 2", image: "productA2.jpg", price: 29.99 },
      { name: "Product 3", image: "productA3.jpg", price: 14.99 },
      { name: "Product 4", image: "productA4.jpg", price: 34.99 }
    ]
  },
  {
    name: "Seller B",
    image: "sellerB.jpg",
    products: [
      { name: "Product 5", image: "productB1.jpg", price: 25.99 },
      { name: "Product 6", image: "productB2.jpg", price: 12.99 },
      { name: "Product 7", image: "productB3.jpg", price: 39.99 },
      { name: "Product 8", image: "productB4.jpg", price: 22.99 }
    ]
  },
  // ... Add more sellers ...
];


sellers.forEach(seller => {
  const sellerDiv = document.createElement('div');
  sellerDiv.classList.add('seller');
  const productGridHTML = seller.products.slice(0, 4).map(product => `
    <div class="product-item">
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
    </div>
  `).join('');

  sellerDiv.innerHTML = `
    <h2>${seller.name}</h2>
    <div class="product-grid">
      ${productGridHTML}
    </div>
  `;
  sellerGrid.appendChild(sellerDiv);
});
