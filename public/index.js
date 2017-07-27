window.onload = retrieveInformation();

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
//   for (var key in localStorage){
//     var tempObject = JSON.parse(localStorage[key])
//     createCard(tempObject);
//   }
}

function createItemCards(info) {
    info.forEach((item, index) => {
        $('#card-container').append(`
            <div class='item-card'>
                <h4 class='item-title'>${item.title}</h4>
                <p>Description</p>
                <h5 class='item-description'>${item.description}</h5>
                <img class='item-picture' src='${item.picture}'>
                <h6 class='item-price'>$${correctPrice(item.price)}</h6>
            </div>`)
    })
}

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