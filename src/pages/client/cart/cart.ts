import {
  getCartItems,
  updateCartItemQuantity,
  removeCartItem,
  calculateCartTotal,
  clearCart,
} from "../../../utils/cart";

// Referencias a elementos del DOM
const cartItemsContainer = document.getElementById("cart-items") as HTMLElement | null;
const cartTotalElement = document.getElementById("cart-total") as HTMLElement | null;
const emptyCartMessage = document.getElementById("empty-cart-message") as HTMLElement | null;
const cartContent = document.getElementById("cart-content") as HTMLElement | null;
const clearCartBtn = document.getElementById("clear-cart-btn") as HTMLButtonElement | null;

/**
 * Renderiza los elementos del carrito en el DOM
 */
function renderCart(): void {
  const items = getCartItems();

  if (!cartItemsContainer || !cartTotalElement) return;

  // Si el carrito está vacío
  if (items.length === 0) {
    if (cartContent) cartContent.style.display = "none";
    if (emptyCartMessage) emptyCartMessage.style.display = "block";
    cartTotalElement.textContent = "$0";
    return;
  }

  // Si hay productos en el carrito
  if (cartContent) cartContent.style.display = "block";
  if (emptyCartMessage) emptyCartMessage.style.display = "none";

  cartItemsContainer.innerHTML = "";

  items.forEach(({ product, cantidad }) => {
    const subtotal = product.precio * cantidad;

    const row = document.createElement("tr");
    row.className = "cart-item-row";

    row.innerHTML = `
      <td class="product-col">
        <div class="product-info" style="display: flex; align-items: center; gap: 10px;">
          <img 
            src="${product.imagen}" 
            alt="${product.nombre}" 
            style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;"
            onerror="this.onerror=null; this.src='/favicon.svg';"
          />
          <div>
            <strong>${product.nombre}</strong>
          </div>
        </div>
      </td>
      <td>$${product.precio.toLocaleString("es-AR")}</td>
      <td>
        <div class="quantity-controls" style="display: inline-flex; align-items: center; gap: 6px;">
          <button type="button" class="btn-qty btn-decrease" data-id="${product.id}">-</button>
          <span class="qty-display">${cantidad}</span>
          <button type="button" class="btn-qty btn-increase" data-id="${product.id}" ${cantidad >= product.stock ? "disabled" : ""}>+</button>
        </div>
      </td>
      <td>$${subtotal.toLocaleString("es-AR")}</td>
      <td>
        <button type="button" class="btn-remove" data-id="${product.id}" title="Eliminar producto">🗑️</button>
      </td>
    `;

    cartItemsContainer.appendChild(row);
  });

  // Actualizar el total acumulado
  const total = calculateCartTotal();
  cartTotalElement.textContent = `$${total.toLocaleString("es-AR")}`;
}

/**
 * Configura los event listeners del carrito
 */
function setupEventListeners(): void {
  // Delegación de eventos para botones de incremento, decremento y eliminación
  if (cartItemsContainer) {
    cartItemsContainer.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      const button = target.closest("button");
      if (!button) return;

      const productId = Number(button.dataset.id);
      if (!productId) return;

      const items = getCartItems();
      const currentItem = items.find((i) => i.product.id === productId);

      if (button.classList.contains("btn-increase")) {
        if (currentItem) {
          updateCartItemQuantity(productId, currentItem.cantidad + 1);
          renderCart();
        }
      } else if (button.classList.contains("btn-decrease")) {
        if (currentItem) {
          updateCartItemQuantity(productId, currentItem.cantidad - 1);
          renderCart();
        }
      } else if (button.classList.contains("btn-remove")) {
        removeCartItem(productId);
        renderCart();
      }
    });
  }

  // Botón para vaciar todo el carrito (opcional pero muy útil)
  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", () => {
      if (confirm("¿Estás seguro de que deseas vaciar el carrito?")) {
        clearCart();
        renderCart();
      }
    });
  }
}

// Inicialización cuando carga la página
document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  setupEventListeners();
});