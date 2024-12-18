// imports the deck class to manage the card
import { Deck } from './deck.js'; 
//imports game glasses
import { PokerGame, BlackjackGame } from './games.js'; 

let deck = new Deck(); //new deck instance
let currentGame; // variable to hold the current game instance

//display home page and hide game area
function showHomePage() {
    document.getElementById('homePage').style.display = 'block'; 
    document.getElementById('gameArea').style.display = 'none'; 
}

// displays gamearea instead
function showGameArea() {
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('gameArea').style.display = 'block'; 
}

//start a game depending on selection (Poker or Blackjack)
function startGame(gameType) {
    showGameArea(); // Display game area
    resetGame(gameType); // Reset game with specified game
}

//update UI with current game state
function updateUI() {
    document.getElementById('result').textContent = ''; // Clear previous results 
    document.getElementById('remainingCards').textContent = deck.remainingCards(); // Update remaining cards count

    const player1HandElement = document.getElementById('player1Hand'); // Get player 1's hand element
    const player2HandElement = document.getElementById('player2Hand'); // Get player 2's hand element

    player1HandElement.innerHTML = ''; // Clear player 1's hand display
    player2HandElement.innerHTML = ''; // Clear player 2's hand display

    removeWinnerText(); // Remove any existing winner text

    if (currentGame) { // Check if a game is currently active
        updatePlayerHands(); // Update UI with current player hands
        updateHandRanks(); // Update UI with current hand ranks

        if (currentGame instanceof PokerGame && currentGame.hands[0].length === 5 && currentGame.hands[1].length === 5) {
            const result = currentGame.evaluateWinner(); //for Poker game
            displayWinner(result); 
        }

        updateBlackjackUI(); // Update UI for Blackjack specific elements

        if (currentGame instanceof BlackjackGame && currentGame.isGameOver()) {
            const result = currentGame.evaluateWinner();//for Blackjack game
            displayWinner(result); 
        }
    }
}

//update player hands depending on the game state
function updatePlayerHands() {
    currentGame.getHands().forEach((hand, index) => { 
        const handElement = document.getElementById(`player${index + 1}Hand`); //get corresponding hand element for each player
        hand.forEach(card => { 
            handElement.appendChild(createCardElement(card)); // add card elements to player's hand
        });
    });
}

//update hand ranks 
function updateHandRanks() {
    const ranks = currentGame.getHandRanks(); 
    document.getElementById('player1Rank').textContent = ranks[0]; 
    document.getElementById('player2Rank').textContent = ranks[1];
}

//update blackjack ui
function updateBlackjackUI() {
    const isBlackjack = currentGame instanceof BlackjackGame; 
    document.querySelectorAll('.blackjack-controls').forEach(control => {
        control.style.display = isBlackjack ? 'block' : 'none'; // Show or hide controls based on game type
    });

    if (isBlackjack) { 
        document.getElementById('player1').classList.toggle('active', currentGame.currentPlayer === 0); 
        document.getElementById('player2').classList.toggle('active', currentGame.currentPlayer === 1);
        updateBlackjackControls(); 
    } else { 
        document.getElementById('player1').classList.remove('active'); 
        document.getElementById('player2').classList.remove('active'); 
    }
}

function removeWinnerText() {
    const existingWinnerText = document.querySelector('.winner-text'); 
    if (existingWinnerText) { 
        existingWinnerText.remove(); 
    }
}

function displayWinner(result) {
    const winnerElement = document.createElement('div'); 
    winnerElement.className = 'winner-text'; 
    winnerElement.textContent = result; 
    document.querySelector('.table').prepend(winnerElement); 
}

// create a card element for display in the UI based on card properties
function createCardElement(card) {
    const cardElement = document.createElement('div'); 
    cardElement.className = 'card'; 
    const suitSymbol = getSuitSymbol(card.suit); 
    const suitColor = getSuitColor(card.suit);

    cardElement.innerHTML = `
        <div class="card-inner">
            <div class="card-front" style="color: ${suitColor}">
                <div class="card-rank">${card.rank}</div>
                <div class="card-suit">${suitSymbol}</div>
            </div>
            <div class="card-back">
                <div class="card-details">NacSpace</div>
            </div>
        </div>
    `;

    cardElement.addEventListener('click', () => { 
        cardElement.classList.toggle('flipped'); // Toggle card flip on click event
    });

    return cardElement; 
}

//get the suit symbol on the card
function getSuitSymbol(suit) {
    const symbols = { 'Hearts': '♥', 'Diamonds': '♦', 'Clubs': '♣', 'Spades': '♠' }; 
    return symbols[suit] || '?'; 
}

// color of the suit
function getSuitColor(suit) {
    return (suit === 'Hearts' || suit === 'Diamonds') ? 'red' : 'black'; 
}

//  show temporary messages (e.g., deck shuffled)
function showMessage(message) {
    const messageElement = document.getElementById('message'); 
    messageElement.textContent = message; 
    messageElement.classList.add('show');

    setTimeout(() => { 
        messageElement.classList.remove('show'); // Remove message after 2 seconds
    }, 2000); 
}

//reset the game and deck based on game type
function resetGame(gameType) {
    deck = new Deck(); 
    deck.shuffle();

    currentGame = gameType === 'poker' ? new PokerGame(deck) : new BlackjackGame(deck); 

    document.getElementById('gameTitle').textContent = `${gameType.charAt(0).toUpperCase() + gameType.slice(1)} Game`; 

    removeWinnerText(); 

    updateUI(); 

    showMessage('Game and deck reset!'); 
}

//  update controls specific to Blackjack gameplay based on player hit/stand
function updateBlackjackControls() {
   ['player1Controls', 'player2Controls'].forEach((id, index) => {  
       const controls = document.getElementById(id); 

       controls.querySelectorAll('button').forEach(btn => {  
           btn.disabled = currentGame.currentPlayer !== index || currentGame.playerStood[index];  
       });  
   });  
}

// Event Listeners 

document.getElementById('pokerBtn').addEventListener('click', () => startGame('poker'));  
document.getElementById('blackjackBtn').addEventListener('click', () => startGame('blackjack'));  

document.getElementById('shuffleBtn').addEventListener('click', () => {  
   deck.shuffle();
   updateUI();
   showMessage('Deck shuffled!');  
});

document.getElementById('cutBtn').addEventListener('click', () => {  
   deck.cut();
   updateUI();
   showMessage('Deck cut!');  
});

document.getElementById('dealBtn').addEventListener('click', () => {  
   if (deck.remainingCards() < 10) {  
       showMessage('Cards running low! Please reload deck');  
   } else {  
       currentGame.deal();  
       updateUI();  
   }  
});

document.getElementById('reloadDeckBtn').addEventListener('click', () => {  
   deck.resetDeck();  
   updateUI();  
   showMessage('Deck reloaded to 52 cards!');  
});

document.getElementById('gameSelect').addEventListener('change', (e) => resetGame(e.target.value));  
document.getElementById('resetGameBtn').addEventListener('click', () => resetGame(currentGame instanceof PokerGame ? 'poker' : 'blackjack'));  
document.getElementById('homeBtn').addEventListener('click', showHomePage);

['hitBtn', 'standBtn'].forEach(className => {  
   document.querySelectorAll(`.${className}`).forEach((btn, index) => {  
       btn.addEventListener('click', () => {  
           if (currentGame instanceof BlackjackGame && currentGame.currentPlayer === index) {  
               currentGame[className === 'hitBtn' ? 'hit' : 'stand']();  
               updateUI();  
           }  
       });  
   });  
});

// Initialize the home page on load.
showHomePage();
