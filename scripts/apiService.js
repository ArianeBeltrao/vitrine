
const PRODUCTS_API = "http://desafio.xlow.com.br/search";

export async function fetchProducts() {
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

export async function fetchProductDetails(productId) {
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