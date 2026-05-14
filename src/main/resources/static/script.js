 let editingProductId = null;

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


          <button onclick="editProduct(${product.id}, '${product.name}', ${product.price}, '${product.description}')">
           編集
          </button>
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
        price: Number(document.getElementById('price').value),
        description: document.getElementById('description').value
    };
    if (!product.name || !document.getElementById('price').value || !product.description) {
    alert('すべての項目を入力してください');
    return;
    }

    if (Number(product.price) < 0) {
    alert('価格は0円以上で入力してください');
    return;
    }

    if (editingProductId) {

        await fetch(`/api/products/${editingProductId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });

    } else {

        await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
    }

    location.reload();
});
async function deleteProduct(id) {

    const result = confirm('本当に削除しますか？');

    if (!result) {
        return;
    }

    await fetch(`/api/products/${id}`, {
        method: 'DELETE'
    });

    location.reload();
}
function editProduct(id, name, price, description) {

    editingProductId = id;

    document.getElementById('name').value = name;
    document.getElementById('price').value = price;
    document.getElementById('description').value = description;
    document.getElementById('submit-button').textContent = '更新';
}