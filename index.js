let welcomeEl = document.getElementById("welcome-el")
let messageEl = document.getElementById("message-el")
let cardsEl = document.getElementById("cards-el")
let sumEl = document.getElementById("sum-el")
let playerEl = document.getElementById("player-el")
let dealerEl = document.getElementById("dealer-el")
let dealersTotal = document.getElementById("dealers-total")
let dealersCards = []
let dealersSum = 0
let cards = []
let sum = 0
let isAlive = false
let hasBlackJack = false
let welcomeMessage = {
    greeting: "Welcome, ",
    name: "Jack Nicholls!"
}

let playerChips = {
    name: "Jack's Chips: £",
}

let chips = 20

welcomeEl.textContent = welcomeMessage.greeting + welcomeMessage.name
playerEl.textContent = playerChips.name + chips

function randomCard(){
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

// Plan is to hide the dealersSecond card when the game starts. 

function startButton() {
    if (chips > 0) {
    let dealersFirst = randomCard() 
    let dealersSecond = randomCard()
    let firstCard = randomCard()
    let secondCard = randomCard()
    dealersCards = [dealersFirst, dealersSecond ]
    dealersSum = dealersFirst + dealersSecond
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    renderGame()
    }
}

function renderGame(){
    dealerEl.textContent = "Dealers Cards: "
    for (let d = 0; d < dealersCards.length; d++) {
        dealerEl.textContent += dealersCards[d] + " "
    }
    dealersTotal.textContent = "Dealers Total: " + dealersSum
    cardsEl.textContent = "Cards: "
    for (let c = 0; c < cards.length; c++) {
        cardsEl.textContent += cards[c] + " "
    }
    sumEl.textContent = "Total: " + sum
    if (sum <= 20) {
        message = "Would you like another card?"
        hasBlackJack = false
        isAlive = true
    } else if (sum === 21) {
        message = "You have BlackJack!"
        hasBlackJack = true
    } else {
        message = "You're out of the game!"
        isAlive = false
    }

    playersMoney()
    messageEl.textContent = message
}

function newCard(){
    if (isAlive === true && hasBlackJack === false) {
        let card = randomCard()
        sum += card
        cards.push(card)
        renderGame()
    }    
}

function playersMoney(){
    if (sum > 21) {
        chips -= 5
    } if (sum === 21)  {
        chips += 10
    } 
    playerEl.innerText = playerChips.name + chips
}

// stay Button to lock the players cards in. Also stops the player from having a new Card.
// Once stay Button is clicked, un-hide the dealers second card

function stayButton(){
    isAlive = false
    let dealersSecond = randomCard()
    dealersSum = dealersFirst + dealersSecond
    dealersTotal.textContent = dealersSum
    renderGame()
}

