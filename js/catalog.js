document.addEventListener("DOMContentLoaded", function() {
    let catalogCreated = false;
    let Products = {};
    const catalogContent = document.querySelector('.catalog-content');

    if(!catalogCreated) {
        fetch('/app/Data/catalog-products.json')
        .then(response => response.json())
        .then(data => {
            Products = data;
            main(); // Llamar a la función principal cambiar a init
        })
        .catch(error => console.error('Error:', error));

        function main() {
            Products.forEach(product => {
                const pContainer = document.createElement("div");
                pContainer.classList.add('catalog-product-container');

                const pPhoto = document.createElement("div");
                pPhoto.classList.add('catalog-product-photo');
                const photoWrapper = document.createElement("div");
                photoWrapper.classList.add('product-photo-wrapper');
                const img = document.createElement("img");
                img.src = product.imageUrl;
                photoWrapper.appendChild(img);
                pPhoto.appendChild(photoWrapper);

                const pInfo = document.createElement("div");
                pInfo.classList.add('catalog-product-info');
                const pName = document.createElement("span");
                pName.classList.add('product-name');
                pName.textContent = product.name;
                const pPrice = document.createElement("span");
                pPrice.classList.add('product-price');
                pPrice.textContent = `$ ${product.price}`;
                const orderBtn = document.createElement("a");
                orderBtn.classList.add('take-order-btn');
                orderBtn.href = product.productUrl;
                orderBtn.textContent = "Hacer pedido";
                pInfo.append(pName, pPrice, orderBtn);

                pContainer.append(pPhoto, pInfo);
                catalogContent.appendChild(pContainer);
            });
        }

        catalogCreated = true;
    }
});
