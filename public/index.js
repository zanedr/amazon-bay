let totalPrice;
window.onload = function() {retrieveInformation();
                totalPrice = 0}

function retrieveInformation(){
    totalPrice = 0;
    retrieveCart();
    retrieveItems();
    retrieveHistory();
};

function retrieveCart(){
  for (var key in localStorage){
    var tempObject = JSON.parse(localStorage[key]);
    const title = tempObject.title.toString();
    addToCart(title, tempObject.price);
  };
};

function retrieveItems(){
    fetch("/api/v1/items").then(res => {
            res.json()
        .then(info => {
            createItemCards(info);
        });
    })
    .catch((error) => {
        console.log(error);
    });
};

function retrieveHistory(){
    fetch("/api/v1/purchasehistory").then(res => {
            res.json()
        .then((info) => {
            if(info.length) {
                $('#order-history-information-container').html('')
                createHistoryCard(info);
            }
        });
    }).catch((error) => {
        console.log(error);
    });
};

function createItem(title, price){ 
    this.id = Date.now();
    this.title = title;
    this.price = price;
};

function createItemCards(info) {
    info.forEach((item, index) => {
        var newItem = new createItem(item.title, item.price);
        $('#card-container').append(`
            <div class='item-card'>
                <h4 class='item-title'>${item.title}</h4>
                <p class='item-description-title'>Description</p>
                <h5 class='item-description'>${item.description}</h5>
                <img class='item-picture' src='${item.picture}'>
                <h6 class='item-price'>$${correctPrice(item.price)}</h6>
                <button class='select-item'>Add to cart</button>
            </div>`);
    });
};

function storeItem(newItem){
    console.log('newItem', newItem)
    var store = JSON.stringify(newItem);
    localStorage.setItem(newItem.id, store);
}

function createHistoryCard(info) {
    info.forEach((item, index) => {
        let fixedDate = item.created_at.slice(0, 10)
        $('#order-history-information-container').append(`
            <div class='order-history-card'>
                <h4 class='order-history-date'>Date of purchase: ${fixedDate}</h4>
                <h4 class='order-history-price'>Price: $${item.price}.00</h4>
            </div>`)
    })
}

$('#card-container').on('click', '.select-item', function(){
    var itemTitle = $(this).siblings('.item-title').text();
    var itemDescription = $(this).siblings('.item-description').text();
    var itemPrice = $(this).siblings('.item-price').text();
    var newItem = new createItem(itemTitle, itemPrice)
    storeItem(newItem)
    addToCart(itemTitle, itemPrice)
});

function addToCart(itemTitle, itemPrice) {
    $('#shopping-cart-information-container').append(`
        <div class='shopping-cart-item'>
            <h3>${itemTitle}</h3>
            <h3>${itemPrice}</h3>
        </div>
    `)
    changeCartTotal(itemPrice)
}

function changeCartTotal(itemPrice) {
    console.log(itemPrice)
    let newItemPrice = itemPrice.slice(1)
    totalPrice = totalPrice + parseFloat(newItemPrice)
    $('#shopping-cart-total').text('Total: $' +totalPrice + '.00')
}

$('#purchase-all').on('click', function(){
    console.log('total price', totalPrice)
    let currentPrice = totalPrice
    fetch('/api/v1/addpurchasehistory', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"price": currentPrice})
    }) .then((res) => {
        res.json()
    }).then(() => {
        retrieveHistory()
        totalPrice = 0
        $('#shopping-cart-total').text('Total: $' +totalPrice + '.00')
        $('#shopping-cart-information-container').html('')
        localStorage.clear();
    })
    .catch((error) => {
        console.log(error);
    });
})

function correctPrice(price) {
    return (price / 100).toFixed(2)
}

$('#order-history-sidebar-toggle').on('click', function(){
    let orderHistoryInfo = $('#order-history-information').attr('class');
    if(orderHistoryInfo === 'hidden') {
        $('#order-history-information').removeClass('hidden').addClass('visible')
        $('#order-history-sidebar-toggle').text('-')
    } else {
        $('#order-history-information').removeClass('visible').addClass('hidden')
        $('#order-history-sidebar-toggle').text('+')
    }
})

$('#shopping-cart-sidebar-toggle').on('click', function(){
    let orderHistoryInfo = $('#shopping-cart-information').attr('class');
    if(orderHistoryInfo === 'hidden') {
        $('#shopping-cart-information').removeClass('hidden').addClass('visible')
        $('#shopping-cart-sidebar-toggle').text('-')
    } else {
        $('#shopping-cart-information').removeClass('visible').addClass('hidden')
        $('#shopping-cart-sidebar-toggle').text('+')
    }
})