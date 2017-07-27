window.onload = retrieveInformation();
let totalPrice = 0

function retrieveInformation(){
    retrieveCart();
    retrieveItems();
    retrieveHistory();
}

function retrieveCart(){
    console.log('retrieve cart')
//   for (var key in localStorage){
//     var tempObject = JSON.parse(localStorage[key])
//     createCard(tempObject);
//   }
}

function retrieveItems(){
    console.log('retrieve items')
    fetch("/api/v1/items").then( res => {
    res.json()
      .then(info => {
        console.log(info)
        createItemCards(info)
      });
    });
//   for (var key in localStorage){
//     var tempObject = JSON.parse(localStorage[key])
//     createCard(tempObject);
//   }
}

function retrieveHistory(){
    console.log('retrieve history')
    fetch("/api/v1/purchasehistory").then( res => {
    res.json()
      .then(info => {
          if(info.length) {
              info.forEach(item => {
             // createHistoryCard(item)
             console.log(item)
              })
          }
        console.log(info)
      });
    });
}

function createItemCards(info) {
    info.forEach((item, index) => {
        $('#card-container').append(`
            <div class='item-card'>
                <h4 class='item-title'>${item.title}</h4>
                <p class='item-description-title'>Description</p>
                <h5 class='item-description'>${item.description}</h5>
                <img class='item-picture' src='${item.picture}'>
                <h6 class='item-price'>$${correctPrice(item.price)}</h6>
                <button class='select-item'>Add to cart</button>
            </div>`)
    })
}

$('#card-container').on('click', '.select-item', function(){
    var itemTitle = $(this).siblings('.item-title').text()
    var itemDescription = $(this).siblings('.item-description').text()
    var itemPrice = $(this).siblings('.item-price').text()
    console.log(itemTitle, itemDescription, itemPrice)
    addToCart(itemTitle, itemDescription, itemPrice)
})

function addToCart(itemTitle, itemDescription, itemPrice) {
    $('#shopping-cart-information-container').append(`
        <div class='shopping-cart-item'>
            <h3>${itemTitle} ${itemPrice}</h3>
        </div>
    `)
    changeCartTotal(itemPrice)
}

function changeCartTotal(itemPrice) {
    let newItemPrice = itemPrice.slice(1)
    // newItemPrice.split('').shift().join('')
    console.log('changetotal', newItemPrice)
    totalPrice = totalPrice + parseFloat(newItemPrice)
    $('#shopping-cart-total').text('Total: $' +totalPrice + '.00')
}

$('#purchase-all').on('click', function(){
    fetch('/api/v1/addpurchasehistory', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"price": totalPrice})
    }) .then(() => {
        
    })
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