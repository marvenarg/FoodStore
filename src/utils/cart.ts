import type { IProduct, ICartItem } from "../types/product";

const CART_KEY = "cart";

export function getCartItems(): ICartItem[] {
  const data = localStorage.getItem(CART_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data) as ICartItem[];
  } catch {
    return [];
  }
}

export function saveCartItems(items: ICartItem[]): void {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function addToCart(product: IProduct, cantidad: number = 1): void {
  const items = getCartItems();
  const existingItem = items.find((item) => item.product.id === product.id);

  if (existingItem) {
    existingItem.cantidad = clampToStock(existingItem.cantidad + cantidad, product.stock);
  } else {
    items.push({ product, cantidad: clampToStock(cantidad, product.stock) });
  }

  saveCartItems(items);
}

export function updateCartItemQuantity(productId: number, cantidad: number): void {
  if (cantidad <= 0) {
    removeCartItem(productId);
    return;
  }

  const items = getCartItems();
  const item = items.find((i) => i.product.id === productId);
  if (item) {
    item.cantidad = clampToStock(cantidad, item.product.stock);
    saveCartItems(items);
  }
}

export function removeCartItem(productId: number): void {
  const items = getCartItems().filter((item) => item.product.id !== productId);
  saveCartItems(items);
}

export function calculateCartTotal(): number {
  const items = getCartItems();
  return items.reduce((total, item) => total + item.product.precio * item.cantidad, 0);
}

export function clearCart(): void {
  localStorage.removeItem(CART_KEY);
}

function clampToStock(cantidad: number, stock: number): number {
  return stock > 0 ? Math.min(cantidad, stock) : cantidad;
}