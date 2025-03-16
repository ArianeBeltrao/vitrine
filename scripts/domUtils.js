export function createProductCard(product, details) {
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

export function setupGridToggle() {
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
}


