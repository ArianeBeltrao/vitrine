import { fetchProducts, fetchProductDetails} from './apiService.js';
import { createProductCard, setupGridToggle } from "./domUtils.js";

async function renderProducts() {
    const loadingMessage = document.querySelector(".loading-message");
    const productContainer = document.querySelector(".container");
    const templateCard = document.querySelector(".card.template");

    if (!productContainer) {
        console.error("Container element not found");
        return;
    }

    loadingMessage.style.display = "block";
    templateCard.style.display = "none"; 

    try {
        const products = await fetchProducts();

        
        document.querySelector("header p").textContent = `${products.length} produtos`;

        if (products.length === 0) {
            productContainer.innerHTML = `<h2 class="empty-message">Nenhum produto encontrado</h2>`;
        } else {
            
            const productCards = await Promise.all(products.map(async (product) => {
                const details = await fetchProductDetails(product.productId);
                
                return createProductCard(product, details);
            }));

            productContainer.innerHTML = "";
            productContainer.append(...productCards);

        }
    } catch (error) {
        console.error("Erro ao renderizar os produtos:", error);
    } finally {
        loadingMessage.style.display = "none"; 
    }
}

document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    setupGridToggle();
});
