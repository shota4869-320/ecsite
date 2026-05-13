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

          <button onclick="deleteProduct(${product.id})">
            削除
          </button>
      `;

      productList.appendChild(div);
    });
});

const form = document.getElementById('product-form');

form.addEventListener('submit', async (event) => {

    event.preventDefault();

    const product = {
        name: document.getElementById('name').value,
        price: document.getElementById('price').value,
        description: document.getElementById('description').value
    };

    await fetch('/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });

    location.reload();
});
async function deleteProduct(id) {

    await fetch(`/api/products/${id}`, {
        method: 'DELETE'
    });

    location.reload();
}