
const PRODUCTS_API = "http://desafio.xlow.com.br/search";

async function fetchProducts() {
    try {
        const response = await fetch(PRODUCTS_API, {
            method: 'GET',
            headers: { 'Accept': '*/*' }
        });
        console.log("Response from fetchProduct:", response);
        return await response.json();
    } catch (error) {
        console.error("Response error from fetchProduct:", error);
        return [];
    }
}

async function fetchProductDetails(productId) {
    try {
        const response = await fetch(`${PRODUCTS_API}/${productId}`, {
            method: 'GET',
            headers: { 'Accept': '*/*' }
        });
        console.log("Response from fetchProductDetails:", response);
        return await response.json();
    } catch (error) {
        console.error("Response error fetchProductDetails:", error);
        return null;
    }
}

function createProductCard(product, details) {
    const templateCard = document.querySelector(".card.template");

    if (!templateCard) {
        console.error("Template card not found");
        return null;
    }

    const newCard = templateCard.cloneNode(true);
    newCard.classList.remove("template");

    newCard.setAttribute("data-product-id", product.productId);
    newCard.querySelector(".product-name").textContent = product.productName;

    if (details) {
        const firstItem = details[0]?.items?.[0];
        const images = firstItem?.images?.map(img => img.imageUrl) || ["./assets/img-not-found.jpg"];

        
        newCard.querySelector(".product-image").src = images[0];

        
        const thumbnailContainer = newCard.querySelector(".thumbnail-container");
        thumbnailContainer.innerHTML = ""; 

        images.slice(0).forEach(imageUrl => {
            const thumbnail = document.createElement("img");
            thumbnail.src = imageUrl;
            thumbnail.classList.add("thumbnail");
            thumbnail.onclick = () => newCard.querySelector(".product-image").src = imageUrl;
            thumbnailContainer.appendChild(thumbnail);
        });


        const firstPriceWithoutDiscount = firstItem?.sellers?.[0]?.commertialOffer?.PriceWithoutDiscount?.toFixed(2) || "N/A";

        const firstPrice = firstItem?.sellers?.[0]?.commertialOffer?.Price?.toFixed(2) || "N/A";
        newCard.querySelector(".product-price").textContent = `R$ ${firstPrice}`;

        if (firstPriceWithoutDiscount > firstPrice) {
            newCard.querySelector(".product-price-without-discount").textContent = `R$ ${firstPriceWithoutDiscount}`;
            newCard.querySelector(".product-price-without-discount").style.display = "block";
        } else {
            newCard.querySelector(".product-price-without-discount").style.display = "none";
        }

        templateCard.style.display = 'block';
    }

    return newCard;
}

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

renderProducts();



document.getElementById('toggle-btn-desktop').addEventListener('click', function() {
    const container = document.querySelector('.container');
    const toggleImgDesktop = document.getElementById('toggle-img-desktop');
;
    if (container.classList.contains("grid-5")) {
        container.classList.remove("grid-5");
        toggleImgDesktop.src = "/assets/five-cards.png";
    } else {
        container.classList.add("grid-5");
        toggleImgDesktop.src = "/assets/four-cards.png";
    }
});

document.getElementById('toggle-btn-mobile').addEventListener('click', function() {
    const container = document.querySelector('.container');
    const toggleImgMobile = document.getElementById('toggle-img-mobile');
;
    if (container.classList.contains("grid-2")) {
        container.classList.remove("grid-2");
        toggleImgMobile.src = "/assets/two-cards.png";
    } else {
        container.classList.add("grid-2");
        toggleImgMobile.src = "/assets/one-card.png";
    }
});

window.addEventListener("resize", function () {
    const container = document.querySelector(".container");

    if (window.innerWidth < 768) {
        container.classList.remove("grid-5");
    } else {
        container.classList.remove("grid-2");
    }
});
