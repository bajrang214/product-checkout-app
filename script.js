// 1. Predefined product catalog (can be expanded)
const productCatalog = [
    { id: "P1", name: "Wireless Mouse", price: 500 },
    { id: "P2", name: "Keyboard", price: 700 },
    { id: "P3", name: "USB Cable", price: 150 },
    { id: "P4", name: "Pendrive", price: 1000 },
    { id: "P5", name: "Earphones", price: 300 }
];

// 2. In-memory cart to store selected products
let cart = [];

// 3. Function to add a product to cart by Product ID
function addToCart() {
    const input = document.getElementById("productIdInput");
    const productId = input.value.trim().toUpperCase(); // make it case-insensitive
    input.value = ""; // clear input box

    // Find the product from the catalog
    const product = productCatalog.find(p => p.id === productId);

    if (!product) {
        alert("Invalid Product ID. Please try again.");
        return;
    }

    // Check if product already exists in cart
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1; // just increment quantity
    } else {
        cart.push({ ...product, quantity: 1 }); // add new item
    }

    renderCart();
}

// 4. Function to display the cart in the table
function renderCart() {
  const tableBody = document.querySelector("#cartTable tbody");
  tableBody.innerHTML = "";

  cart.forEach((item, index) => {
    const row = document.createElement("tr");
    const total = item.quantity * item.price;

    row.innerHTML = `
      <td>${item.name}</td>
      <td>
        <input type="number" min="1" value="${item.quantity}" 
          onchange="updateQuantity(${index}, this.value)" />
      </td>
      <td>₹${item.price}</td>
      <td>₹${total}</td>
      <td>
        <button onclick="removeItem(${index})">❌</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}


// 5. Function to calculate total and display on checkout
function checkout() {
    if (cart.length === 0) {
        alert("Cart is empty. Please add products before checkout.");
        return;
    }

    // Calculate grand total
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Show total amount
    const totalAmount = document.getElementById("totalAmount");
    totalAmount.textContent = `Total Amount to Pay: ₹${total}`;
}

// 6. Update quantity
function updateQuantity(index, newQuantity) {
  const qty = parseInt(newQuantity);

  if (qty < 1 || isNaN(qty)) {
    alert("Invalid quantity");
    return;
  }

  cart[index].quantity = qty;
  renderCart();
}

// 7. Remove item from cart
function removeItem(index) {
  cart.splice(index, 1); // remove from cart array
  renderCart();
}

