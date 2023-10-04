// Const Pagina

const mainSection = document.getElementById('main-section')
let reiniciarBtn = document.getElementById('resetButton')

// Const Values

const cardsValues = cardsConst.map(card => {return card.value})

function calculatePrize(number) {
    if (number >= 0.85) {
        return cardsValues.find(value => value == "Grand")
    } 
    else if (number < 0.85 && number >= 0.55) {
        return cardsValues.find(value => value == "Major")
    } 
    else {
        return cardsValues.find(value => value == "Minor")
    } 
}

function orderRandomly(array) {   

    for (i = 0 ; i < 3 ; i++ ) {

        let currentIndex = array.length, randomIndex;

        while (currentIndex != 0 ) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
        }    
    }
    
    return array;
}

function generateCards() {

    const cards = [];
    const randomSafeNumber = Math.random()

    let totalNoPrize = 0;
    let safePrize = 0;

    while (totalNoPrize < 3 ) {            
        let noPrizeCard = cardsConst.find(card => card.value == "NoPrice")
        cards.push(noPrizeCard)
        totalNoPrize++
    }

    while (safePrize < 3) {        
        let safePrizeValue = calculatePrize(randomSafeNumber)
        let safePrizeCard = cardsConst.find(card => card.value == safePrizeValue)
        cards.push(safePrizeCard)
        safePrize++
    }

    while (cards.length < 14) {
        const randomValue = cardsValues[Math.floor(Math.random() * cardsValues.length)];
        const randomCard = cardsConst.find(card => card.value == randomValue)
        cards.push(randomCard)
    }    
    return cards
}

function showCards() {
    
    let gameCards = generateCards()
    gameCards = orderRandomly(gameCards)

    for(let [index,card] of gameCards.entries()) {

        let reverseCard = document.createElement('div');
        reverseCard.setAttribute('id', 'backcards')
        reverseCard.classList.add('m-2')
        reverseCard.dataset.value = card.value;   
        reverseCard.dataset.text = card.modalTitleText;
        reverseCard.dataset.description = card.modalDescriptionText;  

        let frontCard = document.createElement('div');
        frontCard.setAttribute('id', 'frontcards')
        frontCard.style.backgroundImage = `url(${card.src})`

        let cardNumberDiv = document.createElement('div')
        let cardNumberText = document.createElement('h2')
        cardNumberText.innerHTML = `${index+1}`
        cardNumberText.style.color = "#FFFFFF"
        cardNumberText.style.fontFamily = "Nunito"

        let betSalaDiv = document.createElement('div')
        betSalaDiv.classList.add('bet-sala-logo') 

        mainSection.appendChild(reverseCard)
        reverseCard.appendChild(frontCard)
        reverseCard.appendChild(cardNumberDiv)
        cardNumberDiv.appendChild(cardNumberText)
        reverseCard.appendChild(betSalaDiv)
    }    
}

showCards()

const cards = document.querySelectorAll("#backcards");
cards.forEach(card => {
    card.addEventListener('click', cardClickHandler)
})

let turnedCards = []

function cardClickHandler(){
    
    const currentCard = this;
    currentCard.classList.add('descubierta')

    turnedCards.push(currentCard);

    let checkedCards = turnedCards.filter(card => card.dataset.value == this.dataset.value)

    if (checkedCards.length === 3 ) {

        cards.forEach(card => {
            card.classList.add('descubierta')
        })        

        let modalTitle = document.getElementById('modalTitle');
        let modalDescription = document.getElementById('modalDescription');

        console.log(currentCard.value)

        if (currentCard.dataset.value === "NoPrice") {
            modalTitle.innerHTML = `Siga participando <br> ${currentCard.dataset.text}`
            modalDescription.innerHTML = `${currentCard.dataset.description}`
        } else {
            modalTitle.innerHTML = `Felicidades, has ganado el premio: <br> ${currentCard.dataset.text}`
            modalDescription.innerHTML = `${currentCard.dataset.description}`
        }        
        
        const modal = new bootstrap.Modal(document.getElementById('modal'));
        modal.show();
    }
}

reiniciarBtn.addEventListener('click', function(){
    location.reload()
})
