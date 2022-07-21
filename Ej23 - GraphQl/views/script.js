const   productsTable = document.getElementById('productTable'),
        productsDiv = document.getElementById('productsTab')
   
async function makeHtmlTable(products) {
    return fetch('./partials/products.hbs')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla);
            const html = template({ products })
            return html
        })
}
function renderProduct(item){
    const productTable = document.getElementById('productTable')
    const tr = document.createElement('tr')
      let html=`
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td><img style="width: 100px;" src=${item.image} alt=${item.name}> </td>`
      tr.innerHTML = html 
      if(productTable){
        productTable.appendChild(tr)
      }else{
        location.reload(true)
      } 
}

function addToCart(productId, cartId){
    fetch(`http://localhost:8080/cart/${cartId}/products/${productId}`,
    {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        }
    },
    ).then(res => res.json())
     .then((res)=>{
      location.reload()
    }).catch(error => console.error('Error:', error))
} 
function deleteFromCart(productId, cartId){
  fetch(`http://localhost:8080/cart/${cartId}/products/${productId}`,
  {
      method: 'DELETE',
      headers:{
          'Content-Type': 'application/json'
      }
  },
  ).then(res => res.json())
   .then((res)=>{
      location.reload()
  })
   .catch(error => console.error('Error:', error))
} 
function purchaseCart(cartId){
  fetch(`http://localhost:8080/cart/${cartId}`,
  {
      method: 'POST',
      headers:{
          'Content-Type': 'application/json'
      }
  },
  ).then(res => res.json())
   .then((res)=>{
    location.reload()
    
  })
   .catch(error => console.error('Error:', error))
}

//El cliente consume el backend y obtiene el array de objetos.
fetch('/products/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({query: "{ getAllProducts {name, price, stock} }"})
})
  .then(r => r.json())
  .then(data => console.log('data returned:', data));