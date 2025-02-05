// Cart Working
document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    // product-list
    const productListFrame = document.querySelectorAll('.product-list');
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.querySelector('.cart__items');
    const totalPriceElement = document.getElementById('totalPrice');
    const checkoutButton = document.querySelector('.cart__btn');
    const orderForm = document.getElementById('checkoutForm');
    
    const categoryLists = {
        'Все': document.querySelector('.product-list-all'),
        'Шашлыки': document.querySelector('.product-list-shashlik'),
        'Шаурма': document.querySelector('.product-list-shawarma'),
        'Супы': document.querySelector('.product-list-soups'),
        'Салаты': document.querySelector('.product-list-salads'),
        'Закуски': document.querySelector('.product-list-snacks'),
        'Овощи на мангале': document.querySelector('.product-list-vegeatables'),
        'Напитки': document.querySelector('.product-list-drinks'),
    };

    updateCartCount();
    updateCart();

    // Product Item Single Page
    const productDetails = document.getElementById('productDetails');
    if (productDetails) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');

        if (productId) {
            fetch('data/products.json')
                .then(response => response.json())
                .then(products => {
                    const product = products.find(p => p.id == productId);
                    if (product) {
                        productDetails.innerHTML = `
                            <div class="product__image">
                                <img src="${product.image}" alt="${product.name}">
                            </div>
                            <div class="product__content">
                                <h3>${product.name}</h3>
                                <p>Вес: ${product.weight} г</p>
                                <div class="item-menu__desc"><span>${product.description}</span></div>
                                <span class="product__line line"></span>
                                <div class="product__price">
                                    <div class="item-menu__price"><span>Цена: ${product.price} р</span></div>
                                    <button class="item-menu__basket" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-weight="${product.weight}" data-img="${product.image}"><img src="img/main/menu/basket.svg" alt="Basket Icon" title="Корзина"></button>
                                </div>
                            </div>
                        `;
                    } else {
                        productDetails.innerHTML = '<p>Товар не найден.</p>';
                    }
                });

                document.querySelectorAll('.item-menu__basket').forEach(button => {
                    button.addEventListener('click', () => {
                        const product = {
                            id: button.getAttribute('data-id'),
                            name: button.getAttribute('data-name'),
                            price: parseInt(button.getAttribute('data-price')),
                            weight: button.getAttribute('data-weight'),
                            img: button.getAttribute('data-img'),
                            quantity: 1
                        };
                        addToCart(product);
                    });
                });
        } else {
            productDetails.innerHTML = '<p>Товар не найден.</p>';
        }
    }

    // Product Create in product-list
    if (productListFrame) {
        fetch('data/products.json')
            .then(response => response.json())
            .then(products => {
                products.forEach(product => {
                    const productItem = document.createElement('div');
                    productItem.classList.add('item-menu');
                    productItem.innerHTML = `
                        <div class="item-menu__image"><a href="single.html?id=${product.id}"><img src="${product.image}" alt="${product.name}" title="${product.name}"></a></div>
                        <div class="item-menu__content">
                            <div class="item-menu__title"><span>${product.name}</span></div>
                            <div class="item-menu__weight"><span>${product.weight} г</span></div>
                            <div class="item-menu__desc"><span>${product.description}</span></div>
                            <div class="item-menu__footer">
                                <div class="item-menu__price"><span>${product.price} р</span></div>
                                <button class="item-menu__basket" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-weight="${product.weight}" data-img="${product.image}"><img src="img/main/menu/basket.svg" alt="Basket Icon" title="Корзина"></button>
                            </div>
                        </div>
                    `;

                    // Categorys
                    if (categoryLists[product.category]) {
                        categoryLists[product.category].appendChild(productItem);
                    }
                    // Category All
                    if (categoryLists['Все']) {
                        categoryLists['Все'].appendChild(productItem.cloneNode(true));
                    }
                });
                
                document.querySelectorAll('.item-menu__basket').forEach(button => {
                    button.addEventListener('click', () => {
                        const product = {
                            id: button.getAttribute('data-id'),
                            name: button.getAttribute('data-name'),
                            price: parseInt(button.getAttribute('data-price')),
                            weight: button.getAttribute('data-weight'),
                            img: button.getAttribute('data-img'),
                            quantity: 1
                        };
                        addToCart(product);
                    });
                });
            });
    }

    function addToCart(product) {
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push(product);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        updateCart();
    }

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cartCount) {
            cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        }
    }

    function updateCart() {
        if (!cartItems || !totalPriceElement) return;

        cartItems.innerHTML = '';
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item__image"><img src="${item.img}" alt="${item.name}" title="${item.title}"></div>
                <div class="cart-item__body">
                    <h4>${item.name}</h4>
                    <p>Вес: ${item.weight} г</p>
                    <p>Цена: ${item.price} руб</p>
                    <div class="cart-item__body-quantity">
                        <button class="decrease" data-id="${item.id}">-</button>
                        <input type="number" class="cart-item__quantity" data-id="${item.id}" value="${item.quantity}" min="1">
                        <button class="increase" data-id="${item.id}">+</button>
                    </div>
                </div>
                <button class="cart-item__remove" data-id="${item.id}">Удалить</button>
            `;
            cartItems.appendChild(cartItem);
        });

        

        const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        totalPriceElement.textContent = totalPrice;

        document.querySelectorAll('.increase').forEach(button => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('data-id');
                const product = cart.find(item => item.id === id);
                product.quantity++;
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCart();
            });
        });

        document.querySelectorAll('.decrease').forEach(button => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('data-id');
                const product = cart.find(item => item.id === id);
                if (product.quantity > 1) {
                    product.quantity--;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateCart();
                }
            });
        });

        document.querySelectorAll('.cart-item__quantity').forEach(input => {
            input.addEventListener('change', () => {
                const id = input.getAttribute('data-id');
                const product = cart.find(item => item.id === id);
                const newQuantity = parseInt(input.value);
                if (newQuantity >= 1) {
                    product.quantity = newQuantity;
                } else {
                    product.quantity = 1;
                    input.value = 1;
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCart();
            });
        });

        document.querySelectorAll('.cart-item__remove').forEach(button => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('data-id');
                const product = cart.find(item => item.id === id);
                cart.splice(cart.indexOf(product), 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCart();
                updateCartCount();
            });
        });

        if (cart.length === 0) {
            cartItems.innerHTML = '<div class="cart__empty"><p><img src="img/emptycart.svg" alt="Икона Пустой Корзины" title="Корзина Пуста"><span>Корзина пуста</span><a href="menu.html" title="Перейти в каталог товаров">Перейти в каталог товаров</a></p>';
            if (checkoutButton) {
                checkoutButton.style.display = 'none';
                document.querySelector('.cart__return').style.display = 'none';
                document.querySelector('.cart__total').style.display = 'none';
            }
        } else {
            if (checkoutButton) {
                checkoutButton.style.display = 'flex';
            }
        }
    }

    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            window.location.href = 'checkout.html';
        });
    }

    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Заказ оформлен!');
            localStorage.removeItem('cart');
            updateCart();
            updateCartCount();
        });
    }


});

