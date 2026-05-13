fetch('/api/products')
  .then(response => response.json())
  .then(data => {

    const productList = document.getElementById('product-list');

    data.forEach(product => {

      const div = document.createElement('div');

      div.classList.add('product-card');

      div.innerHTML = `
        <h2>${product.name}</h2>
        <p>${product.price}円</p>
        <p>${product.description}</p>
      `;

      productList.appendChild(div);
    });
});