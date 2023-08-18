    const base_url = 'https://ecommercebackend.fundamentos-29.repl.co/';
    
    
    
    async function getApi(){
        try {
            const data = await fetch(base_url);
            const res = await data.json();
            window.localStorage.setItem('products', JSON.stringify(res));
            return res;
        } catch (error) {
            console.log(error);
        }
    }
// getApi();
function printProducts(products) {
    console.log(products);
    const section = document.querySelector('.section');
    let html = '';
    for(const product of products){
        console.log(product);
        html += `
    <div class="product">
        <div class="product_img">
            <img src="${product.image}" alt="imagen de producto" />
        </div>
        <div class="product_description">
            <h2>
            ${product.category} 
            </h2>
            <p>
            ${product.description} 
            </p>
            <div class="footer">
                <strong>
                Stock: ${product.quantity}
                </strong>
                <strong class="value">
                Precio: $${product.price}
                </strong>
                <button class="add" id=${product.id}>
                Add To cart
                </button>
            </div>
        </div>
    </div>
        `
    }
    section.innerHTML = html;
}
function showCart(){
    let add = document.querySelector('.car');
    let menuCart = document.querySelector('.menu-cart');
    add.addEventListener('click',function(){
        menuCart.classList.toggle('menu_active');
    })
}
function addProductsToCart (products,cart){
    let section = document.querySelector('.section');
    section.addEventListener('click', function (event){
        if(event.target.classList.contains('add')){
            const id = Number(event.target.id);
            const productFind = products.find((product) => { return product.id === id}); // find encuentra el elemento que necesito en este caso el id 
            // cart[id] = productFind;
            if(db.cart[productFind.id]){
                // si el elemento existe en la base de datos del carrito
                if(productFind.quantity===db.cart[productFind.id].amount){
                    // si completamos el stock del producto dejamos de sumar
                    return alert('no tenemos mas en bodega');
                }
                db.cart[productFind.id].amount++; // le adicionamos uno a la cantidad agregada.
            }else{ // si el elemento no existe en la base de datos del carrito
                productFind.amount = 1; // le agregamos la propiedad amount y lo adicionamos a la base de datos del carrito.
                db.cart[productFind.id] = productFind; //{ ...productFind, amount:1};
            }
            
            window.localStorage.setItem('cart', JSON.stringify(cart));
            console.log(cart);
        }
    })
}
function printTocart () {
    const cart_products = document.querySelector('.menu-cart');
    let html = '';
    for (const product in db.cart) {
        const {quantity,price, name, image, id, amount } = db.cart[product];
        html += `
        <section class="menu-cart">
            <div class="cart-products">
            <img src='${image}' alt='image product'
            </div>
            <div class="cart-total">
            <h2>${name}</h2>
            <h3>PRecio: ${price}</h3>
            <p>Stok: ${quantity}</p>
            </div>
        </section>
        `
    }
    cart_products.innerHTML = html;
}

async function main(){
    const db = {
        products: JSON.parse(window.localStorage.getItem('products')) || await getProducts(),
        // cart: {}
        cart: JSON.parse(window.localStorage.getItem('cart')) || {},
    }
    // console.log(db.products)
    printProducts(db.products);
    showCart(db.products);
    addProductsToCart(db.products,db.cart);
    printTocart(db)
}

main();


