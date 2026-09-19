import { PRODUCTS, getCategories } from "../../../data/data";
import { addToCart } from "../../../utils/cart";
import type { ICategoria } from "../../../types/categoria";

// Elementos del DOM
const searchInput = document.getElementById("search-input") as HTMLInputElement | null;
const categoriesList = document.getElementById("lista-categorias") as HTMLElement | null;
const productsContainer = document.getElementById("products-container") as HTMLElement | null;
const noProductsMsg = document.getElementById("no-products-msg") as HTMLElement | null;

let selectedCategoryId: number | null = null;
let searchQuery: string = "";

function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function renderProducts(): void {
  if (!productsContainer) return;

  const filtered = PRODUCTS.filter((product) => {
    if (product.eliminado) return false;

    const matchesCategory =
      selectedCategoryId === null ||
      product.categorias.some((c: ICategoria) => c.id === selectedCategoryId);

    const matchesSearch = normalizar(product.nombre).includes(normalizar(searchQuery));

    return matchesCategory && matchesSearch;
  });

  productsContainer.innerHTML = "";

  if (filtered.length === 0) {
    if (noProductsMsg) noProductsMsg.style.display = "block";
    return;
  }

  if (noProductsMsg) noProductsMsg.style.display = "none";

  filtered.forEach((product) => {
    const card = document.createElement("article");
    card.className = "producto-card";

    card.innerHTML = `
      <img 
        src="${product.imagen}" 
        alt="${product.nombre}" 
        onerror="this.onerror=null; this.src='/favicon.svg';"
      />
      <h3>${product.nombre}</h3>
      <p class="descripcion">${product.descripcion}</p>
      <div class="precio">$${product.precio.toLocaleString("es-AR")}</div>
      <button type="button" class="btn-add-cart" data-id="${product.id}">
        Agregar al carrito
      </button>
    `;

    productsContainer.appendChild(card);
  });
}

function renderCategories(): void {
  if (!categoriesList) return;

  const categories: ICategoria[] = getCategories();
  categoriesList.innerHTML = "";

  // Opción "Todas"
  const liAll = document.createElement("li");
  const aAll = document.createElement("a");
  aAll.href = "#";
  aAll.textContent = "Todas las categorías";
  if (selectedCategoryId === null) {
    aAll.style.color = "var(--color-primario)";
    aAll.style.fontWeight = "bold";
  }
  aAll.addEventListener("click", (e) => {
    e.preventDefault();
    selectedCategoryId = null;
    renderCategories();
    renderProducts();
  });
  liAll.appendChild(aAll);
  categoriesList.appendChild(liAll);

  // Categorías de la base de datos
  categories.forEach((cat) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = "#";
    a.textContent = cat.nombre;
    if (selectedCategoryId === cat.id) {
      a.style.color = "var(--color-primario)";
      a.style.fontWeight = "bold";
    }
    a.addEventListener("click", (e) => {
      e.preventDefault();
      selectedCategoryId = cat.id;
      renderCategories();
      renderProducts();
    });
    li.appendChild(a);
    categoriesList.appendChild(li);
  });
}

function setupEvents(): void {
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = (e.target as HTMLInputElement).value;
      renderProducts();
    });
  }

  if (productsContainer) {
    productsContainer.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains("btn-add-cart")) {
        const id = Number(target.dataset.id);
        const product = PRODUCTS.find((p) => p.id === id);
        if (product) {
          addToCart(product, 1);
          const originalText = target.textContent;
          target.textContent = "✓ ¡Agregado!";
          target.style.backgroundColor = "var(--color-exito, #2ecc71)";
          setTimeout(() => {
            target.textContent = originalText;
            target.style.backgroundColor = "";
          }, 900);
        }
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderCategories();
  renderProducts();
  setupEvents();
});